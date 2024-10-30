"use client";
import TinderCard from 'react-tinder-card';
import ProductCard from "./product-card";

const Component = () => {
    const swiped = (direction: string, nameToDelete: any) => {
        console.log(direction + ' removing: ', nameToDelete);
    };

    const outOfFrame = (name: any) => {
        console.log(name + ' left the screen!');
    };

    return (
        <>
            {DATA.map((card, index) => {
                return (
                    <TinderCard
                        className='absolute select-none'
                        onSwipe={(dir) => swiped(dir, card)}
                        swipeThreshold={100}
                        preventSwipe={['up', 'down']}
                        flickOnSwipe={true}
                        swipeRequirementType='position'
                        onCardLeftScreen={() => outOfFrame(card)}
                        key={index}
                    >
                        <ProductCard product={card}/>
                    </TinderCard>
                );
            })}
        </>
    );
};

export default Component;



const DATA = [
    {
        "description": "Pure Cotton T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1996777/2024/4/8/b8b53722-91ef-4dd4-ade5-337ff56120501712570586979-Roadster-Men-Black-Cotton-Pure-Cotton-T-shirt-64117125705865-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Pure Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck', 'occasion': 'Casual'}"
    },
    {
        "description": "Slim Tropical Printed Pure Cotton T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12377258/2024/7/25/ab076c69-6b6d-4445-b87a-f727e99e9e771721903964046-Urbano-Fashion-Men-Teal-Green-Slim-Fit-Tropical-Printed-Pure-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fit': 'Slim Fit', 'length': 'Regular', 'main_trend': 'Tropical', 'neck': 'Round Neck', 'occasion': 'Casual', 'pattern': 'Printed', 'pattern_coverage': 'All-Over'}"
    },
    {
        "description": "Print Oversized Cotton T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27226100/2024/1/29/0d63dbfd-673d-49d0-be10-751fa0d54c0f1706543722864BULLMERMenTribalPrintedAppliqueT-shirt1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Oversized', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck'}"
    },
    {
        "description": "Men Solid Polo Collar T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/16571510/2022/1/25/4795a975-86d9-4d71-ade8-cfe05f47cab81643104562191-Allen-Solly-Men-Yellow--White-Polo-Collar-T-shirt-3851643104-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Polo Collar'}"
    },
    {
        "description": "Men Polo Collar Applique T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/SEPTEMBER/7/VouyYW4N_3ad45252456a4958acd9ee91ab64942d.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Polo Collar', 'occasion': 'Casual'}"
    },
    {
        "description": "Striped Round Neck T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/28727814/2024/4/6/c19682d1-9d4c-4d38-9451-45331bab81851712384125011ManiacMenStripedV-NeckDrop-ShoulderSleevesPocketsT-shirt1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Oversized', 'length': 'Regular', 'main_trend': 'Multi or Variegated Stripes', 'neck': 'Round Neck'}"
    },
    {
        "description": "Solid Round Neck T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2475892/2018/4/3/11522732991435-Roadster-Men-Black-Solid-Round-Neck-T-shirt-1531522732991218-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'Placement Print', 'neck': 'Round Neck', 'occasion': 'Casual', 'pattern': 'Solid'}"
    },
    {
        "description": "Solid Lounge T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12027422/2022/9/15/7a4e30f1-809f-4111-9991-6fd07d8832e21663221355704LevisMenCharcoalGreySolidRoundNeckLoungeT-shirts1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'neck': 'Round Neck', 'pattern': 'Solid', 'sleeve_length': 'Short Sleeves', 'type': 'Regular'}"
    },
    {
        "description": "Polo Collar Lounge Tshirts",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/28138228/2024/8/14/5ac5da7b-b7ed-4fb8-9f82-cd75dc6215a61723609139978-Lux-Cozi-Polo-Collar-Lounge-Tshirts-511723609139421-2.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton Blend', 'neck': 'Polo Collar', 'pattern': 'Solid', 'sleeve_length': 'Short Sleeves', 'type': 'Regular'}"
    },
    {
        "description": "Men Solid Waffle T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/16997726/2022/2/17/7e310403-4a7e-4b03-b1d4-93b55d14a4681645083078794-Roadster-Men-Tshirts-4211645083078121-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck', 'occasion': 'Casual'}"
    },
    {
        "description": "Polo Collar Cotton T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25181318/2024/9/5/3377b05b-de4a-46f0-8937-61f76dfafae21725528704806-Rigo-Polo-Collar-Waffle-Knit-Cotton-T-shirt-1241725528703957-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Polo Collar', 'occasion': 'Casual'}"
    },
    {
        "description": "Oversized Printed T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/26858810/2024/3/19/038d09b0-220e-488d-8707-d0b6c1b769991710836863241-NOBERO-Graphic-Printed-Oversized-T-shirt-6021710836863167-7.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Oversized', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck', 'occasion': 'Casual'}"
    },
    {
        "description": "Striped Pure Cotton Relaxed T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/12956244/2021/4/20/668b68ba-0250-4fcd-a8a0-49bbec71f3591618915179312-Kook-N-Keech-Men-Tshirts-971618915178743-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Pure Cotton', 'fit': 'Relaxed Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck', 'occasion': 'Casual', 'pattern': 'Striped'}"
    },
    {
        "description": "Solid Polo Collar T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/10943272/2020/3/16/e3d1b7df-44bd-4395-b68a-352fb9f6fb9a1584340066012-Roadster-Men-Navy-Blue-Solid-Polo-Collar-T-shirt-63515843400-1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'neck': 'Polo Collar', 'occasion': 'Casual', 'pattern': 'Solid', 'pattern_coverage': 'Placement'}"
    },
    {
        "description": "Men T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/SEPTEMBER/29/UobVxrub_ffa72d8e913a4e82b713f670b001aa8b.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Polyester', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck'}"
    },
    {
        "description": "Cotton Regular Fit T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/28204808/2024/3/12/02f48e07-835b-4bdf-9f48-aa1bcb25a1ed1710225898577RegularFitT-shirt1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Pure Cotton', 'fit': 'Regular Fit', 'length': 'Regular', 'main_trend': 'New Basics', 'neck': 'Round Neck', 'occasion': 'Casual'}"
    },
    {
        "description": "Oversized Cotton T-shirt",
        "image_url": "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/24014326/2023/7/14/c3bb4dd9-b557-4602-a885-f77b445645bc1689274870298BULLMERMenBlackTypographyPrintedPocketsT-shirt1.jpg",
        "gender": "men",
        "item_type": "t-shirt",
        "specifications": "{'fabric': 'Cotton', 'fit': 'Oversized', 'length': 'Regular', 'main_trend': 'Graphic Print Others', 'neck': 'Round Neck', 'occasion': 'Casual'}"
    }
]


export type ProductType = typeof DATA[number];