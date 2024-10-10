import { Chip, Stack, Typography } from "@mui/material";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";


const LISTBOX_PADDING = 8; // px

const splitOnLastOccurrence = (str: string, delimiter: string) => {
    const lastIndex = str.lastIndexOf(delimiter);

    if (lastIndex === -1) {
        return [str];
    }

    const beforeDelimiter = str.substring(0, lastIndex);
    const afterDelimiter = str.substring(lastIndex + delimiter.length);

    return [beforeDelimiter, afterDelimiter];
}

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING,
    };

    const { key, ...optionProps } = dataSet[0];
    const [name, category] = splitOnLastOccurrence(dataSet[1], " - ")
    const searchTerm = dataSet[2];

    const matchesName = match(name, searchTerm, { insideWords: true });
    const partsName = parse(name, matchesName);

    const matchesCategory = match(category, searchTerm ?? undefined,  { insideWords: true });
    const partsCategory = parse(category, matchesCategory);

    return (
        <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Typography>
                    {partsName.map((part, index) => (
                        <span
                            key={index}
                            style={{
                                fontWeight: part.highlight ? 700 : 400,
                            }}
                        >
                            {part.text}
                        </span>
                    ))}
                </Typography>
                <Chip label={partsCategory.map((part, index) => (
                    <span
                        key={index}
                        style={{
                            fontWeight: part.highlight ? 700 : 400,
                        }}
                    >
                        {part.text}
                    </span>
                ))} sx={{ marginLeft: "10px" }} />
            </Stack>
        </Typography>
    );
}


const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

OuterElementType.displayName = "OuterElementType";

function useResetCache(data: number) {
    const ref = useRef<VariableSizeList>(null);
    useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

interface SizeRef {
    [key: number]: number | null;
}


export const ListboxComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
    function ListboxComponent(props, ref) {
        const { children, ...other } = props;
        const itemData: React.ReactChild[] = [];
        (children as React.ReactChild[]).forEach((item: React.ReactChild & { children?: React.ReactChild[] }) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        });

        const rowHeightRefs = useRef<SizeRef>({});

        const itemCount = itemData.length;
        const gridRef = useResetCache(itemCount);

        const getItemSize = (index: number) => {
            const size = rowHeightRefs?.current[index] || 50;
            return size;
        };

        const getCurtainHeight = () => {
            const height = itemData.map((_, index) => getItemSize(index)).reduce((a, b) => a + b, 0);
            if (height > 300) {
                return 300;
            }
            return height + LISTBOX_PADDING * 2;
        };

        return (
            <div ref={ref}>
                <OuterElementContext.Provider value={other}>
                    <VariableSizeList
                        itemData={itemData}
                        height={getCurtainHeight()}
                        width="100%"
                        ref={gridRef}
                        outerElementType={OuterElementType}
                        itemSize={(index) => getItemSize(index)}
                        overscanCount={5}
                        itemCount={itemCount}
                    >
                        {renderRow}
                    </VariableSizeList>
                </OuterElementContext.Provider>
            </div>
        );
    }
);