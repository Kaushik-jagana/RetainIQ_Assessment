import React, { useState, useCallback } from 'react';
import DesignModal from './DesignModal';
import TableRow from './TableRow';
import toast, { Toaster } from 'react-hot-toast';
import update from 'immutability-helper';
import Image from 'next/image';


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

const Table: React.FC = () => {
    const [states, setStates] = useState<State[]>([
        {
            id: 1,
            name: 'Anarkali Kurtas',
            filters: ['tags', 'contains', 'onsale'],
            designs: {
                1: { url: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25145098/2023/9/25/c989a6ce-cd8f-48d3-b850-bf47c3ea10581695625499112ShaebySASSAFRASOrangeBluePrintedReadytoWearLehenga2.jpg', name: 'Image - Zero Discount' },
                2: { url: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/27158682/2024/1/23/0e2c45ef-58d4-4ef8-9213-7818d613b29d1706018652571MeeranshiWomenFloralPrintedKeyholeNeckThreadWorkKurta1.jpg', name: 'Single Image Products' },
            },
        },
        {
            id: 2,
            name: 'Anarkali Kurtas',
            filters: ['tags', 'contains', 'label:New'],
            designs: {
                1: { url: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/27158682/2024/1/23/0e2c45ef-58d4-4ef8-9213-7818d613b29d1706018652571MeeranshiWomenFloralPrintedKeyholeNeckThreadWorkKurta1.jpg', name: 'Single Image Products' },
                2: { url: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/28176282/2024/3/22/5238b821-99ce-4a14-bb12-cc99586074dd1711102034033-Blue-leganga-choli-191711102033187-1.jpg', name: '4-image fallback' },
            },
        },
    ]);

    const [variants, setVariants] = useState<Variant[]>([
        { id: 1, name: 'Primary Variant' },
        { id: 2, name: 'Variant 2' },
    ]);

    const [modalState, setModalState] = useState<{ rowId: number; variantId: number } | null>(null);

    const addState = () => {
        const newState: State = { id: states.length + 1, name: `${states.length + 1}`, filters: [], designs: {} };
        setStates([...states, newState]);
        toast.success('Row added');
    };

    const removeState = (id: number) => {
        setStates(states.filter(state => state.id !== id));
        toast.error('Row removed');
    };

    const addVariant = () => {
        const newVariant: Variant = { id: variants.length + 1, name: `Variant ${variants.length + 1}` };
        setVariants([...variants, newVariant]);
        toast.success('Column added');
    };

    const removeVariant = (id: number) => {
        setVariants(variants.filter(variant => variant.id !== id));
        toast.error('Column removed');
    };

    const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
        setStates((prevStates) =>
            update(prevStates, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevStates[dragIndex]],
                ],
            })
        );
    }, []);

    const openDesignModal = (rowId: number, variantId: number) => {
        setModalState({ rowId, variantId });
    };

    const handleSelectDesign = (imageSrc: string, imageName: string) => {
        if (modalState) {
            setStates((prevStates) =>
                prevStates.map((state) =>
                    state.id === modalState.rowId
                        ? {
                            ...state,
                            designs: {
                                ...state.designs,
                                [modalState.variantId]: { url: imageSrc, name: imageName },
                            },
                        }
                        : state
                )
            );
            setModalState(null);
        }
    };

    return (
        <div className="container mx-auto my-4 bg-[#F9FBFC] p-4 border border-TextGreyLight">
            <div className="overflow-x-auto">
                <table className="max-w-full">
                    <thead>
                        <tr>
                            <td className="sticky-header left-0 border-none w-[80px]">{" "}</td>
                            <td className="text-TextGrey w-[300px] sticky-header left-[75px]">Product Filter</td>
                            <td className="max-w-[650px]">
                                <div className='flex items-center justify-between gap-3'>
                                    <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                                        {variants.map((variant) => (
                                            <div key={variant.id} className="min-w-[250px] flex items-center justify-between gap-3 border-r">
                                                <div className="flex-1 flex justify-center">
                                                    <p className="text-TextGrey text-center">{variant.name}</p>
                                                </div>
                                                <button onClick={() => removeVariant(variant.id)} className="cursor-pointer">
                                                    <Image src="/ColDelete.svg" alt="Remove" width={20} height={20} className="w-[20px] h-[20px]" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {states.map((state, index) => (
                            <TableRow
                                key={state.id}
                                index={index}
                                id={state.id}
                                state={state}
                                variants={variants}
                                removeState={removeState}
                                addVariant={addVariant}
                                moveRow={moveRow}
                                openDesignModal={openDesignModal}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="sticky-header left-0">
                                <button onClick={addState} className="btn">
                                    <Image src="/add.svg" alt="Add" width={20} height={20} />
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Toaster />
            {modalState && (
                <DesignModal
                    onClose={() => setModalState(null)}
                    onSelectDesign={handleSelectDesign}
                />
            )}
        </div>
    );
};

export default Table;
