import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth } from '../../../../services/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Noticias() {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const user = auth.currentUser;
  const nome = user.displayName;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, 'gs://projeto-1df07.appspot.com/ultimas noticias');

      try {
        const imageList = await listAll(storageRef);
        const urls = await Promise.all(imageList.items.map(async (item) => {
          const imageUrl = await getDownloadURL(item);
          return imageUrl;
        }));
        setImageUrls(urls);
        if (urls.length > 0) {
          setSelectedImage(urls[0]); // Define a primeira imagem como selecionada
        }
      } catch (error) {
        console.error('Erro ao obter imagens do Firebase Storage:', error);
      }
    };

    fetchImages();
  }, []);

  const calculateItemSize = () => {
    const itemWidth = (windowWidth - windowWidth * 0.06) / 3; // Largura da miniatura
    const itemHeight = itemWidth; // Altura igual à largura para manter a proporção
    return { width: itemWidth, height: itemHeight };
  };

  const tabBarButtonWidth = windowWidth * 0.16; // Largura dos outros botões do tabBar
  const centralButtonWidth = tabBarButtonWidth * 2; // Largura do botão central (dobro do tamanho dos outros)

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/REALBK.png')}
        style={styles.backgroundImage}
      />
      <View style={[styles.contentContainer, { height: windowHeight * 0.7 }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Noticias</Text>
        </View>
        <View style={styles.headerEx}>
          <Text style={styles.headerTextEx}>"Conheça um pouco mais da família Real"</Text>
        </View>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={[styles.selectedImage, { height: windowHeight * 0.6 }]} />
        )}

        <FlatList
          data={imageUrls}
          renderItem={({ item }) => {
            const itemSize = calculateItemSize();
            return (
              <TouchableOpacity
                onPress={() => setSelectedImage(item)}
                style={{ width: itemSize.width, height: itemSize.height, margin: windowWidth * 0.001 }}
              >
                <Image source={{ uri: item }} style={[styles.thumbnail, itemSize]} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          style={styles.flatList}
          numColumns={3}
        />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Noticias')}>
          <Ionicons name="newspaper" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Time')}>
          <Ionicons name="images" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton, styles.centerButton]} onPress={() => navigation.navigate('Conteudo')}>
          <Image source={require('../../../assets/logo.png')} style={[styles.imageCentral, { width: centralButtonWidth }]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Agenda')}>
          <Ionicons name="calendar" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Social')}>
          <Ionicons name="share-social" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    height: windowHeight * 0.1,
    backgroundColor: '#F98404',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  headerEx: {
    height: windowHeight * 0.1,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.050,
    marginTop: 30,
  },
  headerTextEx: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.050,
  },
  selectedImage: {
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'black',
    marginTop: windowHeight * 0.0001,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  flatList: {
    marginVertical: windowHeight * 0.0001,
    paddingHorizontal: windowWidth * 0.03,
  },
  tabBar: {
    flexDirection: 'row',
    height: windowHeight * 0.08,
    borderTopColor: 'white',
    borderTopWidth: 1,
    borderColor: 'white',
    backgroundColor: '#F98404',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    flex: 1.5,
  },
  imageCentral: {
    height: '120%',
    width:"100%"
  },
});
