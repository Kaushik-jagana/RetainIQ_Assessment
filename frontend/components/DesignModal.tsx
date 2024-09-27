import React from 'react';
import Image from 'next/image';

interface DesignModalProps {
  onClose: () => void;
  onSelectDesign: (imageSrc: string, imageName: string) => void;
}

const DesignModal: React.FC<DesignModalProps> = ({ onClose, onSelectDesign }) => {
  const designs = [
      { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/27158682/2024/1/23/0e2c45ef-58d4-4ef8-9213-7818d613b29d1706018652571MeeranshiWomenFloralPrintedKeyholeNeckThreadWorkKurta1.jpg', name: 'Single Image Products' },
    { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25145098/2023/9/25/c989a6ce-cd8f-48d3-b850-bf47c3ea10581695625499112ShaebySASSAFRASOrangeBluePrintedReadytoWearLehenga2.jpg', name: 'Image - Zero Discount' },
    { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/28176282/2024/3/22/5238b821-99ce-4a14-bb12-cc99586074dd1711102034033-Blue-leganga-choli-191711102033187-1.jpg', name: '4-image fallback' },
    { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25145098/2023/9/25/c989a6ce-cd8f-48d3-b850-bf47c3ea10581695625499112ShaebySASSAFRASOrangeBluePrintedReadytoWearLehenga2.jpg', name: 'Image - Zero Discount' },
    { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/28176282/2024/3/22/5238b821-99ce-4a14-bb12-cc99586074dd1711102034033-Blue-leganga-choli-191711102033187-1.jpg', name: '4-image fallback' },
    { src: 'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/27158682/2024/1/23/0e2c45ef-58d4-4ef8-9213-7818d613b29d1706018652571MeeranshiWomenFloralPrintedKeyholeNeckThreadWorkKurta1.jpg', name: 'Single Image Products' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Select a Design</h2>
        <div className="grid grid-cols-3 gap-4">
          {designs.map((design) => (
            <div
              key={design.name}
              className="cursor-pointer border p-2 rounded hover:shadow-lg"
              onClick={() => onSelectDesign(design.src, design.name)}
            >
              <img src={design.src} alt={design.name} className="w-full h-32 object-cover" />
              <p className="text-center mt-2">{design.name}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default DesignModal;
