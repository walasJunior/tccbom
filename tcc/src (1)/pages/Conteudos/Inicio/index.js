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
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const NovoComponente = () => {
  return (
    <View>
      {/* Conteúdo do seu novo componente */}
    </View>
  );
}

export default function Inicio() {
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
          setSelectedImage(urls[0]);
        }
      } catch (error) {
        console.error('Erro ao obter imagens do Firebase Storage:', error);
      }
    };

    fetchImages();
  }, []);

  const calculateItemSize = () => {
    const itemWidth = (windowWidth - windowWidth * 0.06) / 3;
    const itemHeight = itemWidth;
    return { width: itemWidth, height: itemHeight };
  };

  const tabBarButtonWidth = windowWidth * 0.16;
  const centralButtonWidth = tabBarButtonWidth * 2;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/REALBK.png')}
        style={styles.backgroundImage}
      />
      <View style={[styles.contentContainer, { height: windowHeight * 0.7 }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bem Vindo(a) {nome} !!!</Text>
        </View>
        <View style={styles.headerEx}>
          <Text style={styles.headerTextEx}>" UM POR TODOS E TODOS PELO REAL "</Text>
        </View>
      </View>

      <View style={styles.container1}>
      <GestureHandlerRootView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image style={styles.logo} source={require('../../../assets/logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/logo.png')} />
          <Image style={styles.logo} source={require('../../../assets/logo.png')} />
        </ScrollView>
      </GestureHandlerRootView>
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
  container1: {
    flex: 2,
 
  },
  logo:{
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',

      width:150, // Ajuste a largura conforme necessário
      height: 150, // Ajuste a altura conforme necessário
      resizeMode: 'contain',
      marginBottom:40,
      marginTop:40,
    

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
    borderBottomEndRadius:40,
    borderBottomStartRadius:40,
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
    fontSize: windowWidth * 0.042,
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
