"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Image from 'next/image';
import { Swipeable as SwipeAble, direction } from 'nexo-deck-swiper';

const DATA = [
    {
        title: "Ethnic Motifs Kurta",
        image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/27836364/2024/4/4/1afb5a61-6eb3-42b3-90ab-6731277a41f61712224523981-Anouk-Ethnic-Motifs-Mandarin-Collar-Long-Sleeves-Thread-Work-1.jpg",
        gender: "men",
        item_type: "ethnic wear",
        specifications: { sleeve_length: 'Long Sleeves' }
    },
    {
        title: "Sequinned Kurta With Pyjamas",
        image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/AUGUST/16/9RUKnkXA_ab375a6336784c7b96d2c8e5f9b6e007.jpg",
        gender: "men",
        item_type: "ethnic wear",
        specifications: { sleeve_length: 'Long Sleeves' }
    },
    {
        title: "Men Embroidered Kurta Set",
        image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23110648/2023/5/10/6e171581-5701-4aba-ae63-6c04871ba2e51683716183350EmbroideredKurtaSet1.jpg",
        gender: "men",
        item_type: "ethnic wear",
        specifications: { sleeve_length: 'Long Sleeves' }
    }
];

const Component = () => {
    const handleOnSwipe = (swipeDirection: string) => {
        if (swipeDirection === direction.RIGHT) {
            // handle right swipe
            return;
        }

        if (swipeDirection === direction.LEFT) {
            // handle left swipe
            return;
        }
    }

    return (<>
        {DATA.map((card, index) => {
            return <SwipeAble onSwipe={handleOnSwipe} key={index}>
                <Card>
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription> {card.gender.toUpperCase()} | {card.item_type.toUpperCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src={card.image} width={540} height={720} alt={card.title} />
                    </CardContent>
                </Card>
            </SwipeAble>
        })}

        <Swipeable onSwipe={handleOnSwipe}>
            <div className="card">
                Your card content here
            </div>
        </Swipeable>
    </>
    );
};

export default Component;