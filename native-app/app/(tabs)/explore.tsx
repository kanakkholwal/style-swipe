import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './explore.styles';

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

const SwipeScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <View>
          <Text>SwipeScreen</Text>
        </View>
        <View style={styles.container}>
          <Swiper
            cards={DATA}
            renderCard={(card) => (
              <View style={styles.card}>
                <Image source={{ uri: card.image }} style={styles.image} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.title}>{card.title}</Text>
                  <Text style={styles.description}>
                    {card.gender.toUpperCase()} | {card.item_type.toUpperCase()}
                  </Text>
                  <Text style={styles.specifications}>
                    Sleeve Length: {card.specifications.sleeve_length}
                  </Text>
                </View>
              </View>
            )}
            stackSize={3}
            backgroundColor="#f0f0f0"
            cardIndex={0}
            showSecondCard={true}
            animateCardOpacity
            infinite
            onSwiped={(cardIndex) => { console.log('Swiped: ' + cardIndex); }}
            onSwipedAll={() => { console.log('All cards swiped'); }}
            onSwipedRight={(cardIndex) => { console.log('Liked: ' + DATA[cardIndex].title); }}
            onSwipedLeft={(cardIndex) => { console.log('Disliked: ' + DATA[cardIndex].title); }}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'red',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                  },
                },
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'green',
                    color: 'white',
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                  },
                },
              },
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  );
};



export default SwipeScreen;
