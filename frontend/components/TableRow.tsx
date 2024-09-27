import React, { useRef } from 'react';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../constants/card';

interface State {
    id: number;
    name: string;
    filters: string[];
    designs: { [variantId: number]: { url: string; name: string } | null };
}

interface Variant {
    id: number;
    name: string;
}

interface TableRowProps {
    state: State;
    variants: Variant[];
    removeState: (id: number) => void;
    index: number;
    id: number;
    addVariant: () => void;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
    openDesignModal: (rowId: number, variantId: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
    state,
    variants,
    removeState,
    index,
    id,
    addVariant,
    moveRow,
    openDesignModal,
}) => {
    const ref = useRef<HTMLTableRowElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <tr key={state.id} className="h-[250px] group" style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <td className="sticky-header left-0 border-none">
                <button onClick={() => removeState(state.id)} className="cursor-pointer flex-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <Image src="/delete.svg" alt="Remove" width={20} height={20} className='w-[20px] h-[20px]' />
                </button>
                <div className="flex-center gap-3">
                    <h1 className="heading text-3xl md:text-4xl font-bold">{index + 1}</h1>
                    <button className="cursor-pointer">
                        <Image src="/Drag.png" alt="Drag" width={20} height={20} />
                    </button>
                </div>
            </td>
            <td className="sticky-header left-[75px]">
                {state.filters.length > 0 ? (
                    <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[400px] h-[200px] bg-white mr-8">
                        {state.filters.map((filter, i) => (
                            <span
                                key={i}
                                className={`px-2 py-1 rounded-md text-sm ${i % 2 !== 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                            >
                                {filter}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[400px] h-[200px] bg-white mr-8">
                        <button className="filterButton flex-center gap-3">
                            <Image src="/add.svg" alt="Add" width={20} height={20} className='w-[20px] h-[20px]' />
                            <p className="text-TextGrey">Add Product Filters</p>
                        </button>
                    </div>
                )}
            </td>

            <td colSpan={variants.length}>
                <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                    {variants.map((variant) => (
                        <div key={variant.id} className="min-w-[250px] relative group">
                            {/* Increased min-width to 250px for more space */}
                            <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[220px] h-[200px] bg-white relative">
                                {/* Increased width to 220px and height to 220px */}
                                {state.designs[variant.id] ? (
                                    <div className="flex flex-col items-center gap-2 relative">
                                        <div className="w-[180px] h-[140px]">
                                            <img
                                                src={state.designs[variant.id]!.url}
                                                alt={state.designs[variant.id]!.name}
                                                className="w-full h-full object-contain rounded-md"
                                            />
                                        </div>
                                        <h6 className="text-sm text-TextGrey mt-2">{state.designs[variant.id]!.name}</h6>
                                        <button onClick={() => openDesignModal(state.id, variant.id)} className="absolute top-2 right-2 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100">
                                            <Image src="/upload.svg" alt="edit" width={20} height={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => openDesignModal(state.id, variant.id)} className="filterButton flex-center gap-3 cursor-pointer bg-white absolute">
                                        <Image src="/add.svg" alt="Upload" width={20} height={20} className='w-[20px] h-[20px]' />
                                        <p className="text-TextGrey">Add design</p>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </td>
            <td className="border-none">
                <button onClick={addVariant} className="btn">
                    <Image src="/add.svg" alt="Add" width={20} height={20} />
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
