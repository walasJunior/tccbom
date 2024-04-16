import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Linking,
} from 'react-native';
import { auth } from '../../../../services/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const socialLinks = [
  { imageSource: require('../../../assets/facebook.png'), url: 'https://www.facebook.com/realcangaibafs' },
  { imageSource: require('../../../assets/tiktok.gif'), url: 'https://www.tiktok.com/@realcangaiba' },
  { imageSource: require('../../../assets/instagram.gif'), url: 'https://www.instagram.com/realcangaiba/' },
  { imageSource: require('../../../assets/YouTube-Cor.jpg'), url: 'https://www.youtube.com/channel/UCve-Cjx6JvOsRlUSz05JXwg' },
];

export default function Noticias() {
  const user = auth.currentUser;
  const nome = user.displayName;
  const navigation = useNavigation();

  useEffect(() => {
    // Lógica para buscar dados, se necessário
  }, []); // Adicione dependências, se houver

  const chunkArray = (array, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  const socialLinksChunks = chunkArray(socialLinks, 2);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/REALBK.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>REDE SOCIAIS</Text>
        </View>
        <View style={styles.headerEx}>
          <Text style={styles.headerTextEx}>"Nos siga nas Redes Sociais"</Text>
        </View>
      
        <View style={styles.containerLogo}>
          {socialLinksChunks.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.logoRow}>
              {row.map((social, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.logoItem}
                  onPress={() => Linking.openURL(social.url)}
                >
                  <Image source={social.imageSource} style={styles.logoImage} />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
     
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Noticias')}>
          <Ionicons name="newspaper" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Time')}>
          <Ionicons name="images" color="black" size={windowWidth * 0.08} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton ,styles.centerButton]} onPress={() => navigation.navigate('Conteudo')}>
          <Image source={require('../../../assets/logo.png')} style={styles.imageCentral} />
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    fontSize: windowWidth * 0.05,
    marginTop: 30,
  },
  headerTextEx: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.05,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  logoItem: {
    marginHorizontal: 10,
  },
  logoImage: {
    width:150, // Ajuste a largura conforme necessário
    height: 150, // Ajuste a altura conforme necessário
    resizeMode: 'contain',
    marginBottom:40,
    marginTop:40,
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
