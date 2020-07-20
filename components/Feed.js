import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, RefreshControl ,FlatList, SafeAreaView,Image, Dimensions, TouchableOpacity} from 'react-native';
import * as Linking from 'expo-linking';

const api = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=5573827c3604446d90222f769d9a10d0';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
const featuredWidth = Dimensions.get('window').width - Dimensions.get('window').width / 100 * 10;
const featuredHeight = Dimensions.get('window').height - Dimensions.get('window').height / 100 *70;

const articleHeight = Dimensions.get('window').height - Dimensions.get('window').height / 100 * 85;

const headerdHeight = Dimensions.get('window').height - Dimensions.get('window').height / 100 * 90;

export default class Feed extends React.Component {
    state = {
        news: [
        ],
        refreshing: false
    };
    _handlePress = (url) => {
        Linking.openURL(url);
        this.props.onPress && this.props.onPress();
      };

     getNewsFromApi = async () =>{
         const response = await fetch(api);
         const json = await response.json();
         this.setState({news:json.articles})
     }

     _onRefresh = () => {
        this.getNewsFromApi();
        console.log('refreshed')
     }

    componentDidMount()
    {
        this.getNewsFromApi();
    }

    render() {
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <SafeAreaView style={{height: headerdHeight}}></SafeAreaView>
                <Text style={styles.title}>For You</Text>
                <Text style={styles.sub}>Reccomandations based on our top daily news</Text>
                <FlatList
                    contentContainerStyle={{width:featuredWidth  }}
                    columnWrapperStyle={{ justifyContent:'space-between'}}
                    data = {this.state.news}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    numColumns={2}
                    refreshControl={<RefreshControl
                        colors={["#FF1D4D", "#FF1D4D"]}
                        tintColor = '#FF1D4D'
                        refreshing={this.state.refreshing}
                        onRefresh = {this._onRefresh}
                        />}
                 
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({item}) => 
                    (
                        <TouchableOpacity 
                            onPress={() => this._handlePress(item.url)}
                            style={{
                                width:this.state.news[0].title == item.title ? featuredWidth - featuredWidth / 100 * 0 : featuredWidth - featuredWidth / 100 * 54,
                                marginTop:'8%',
                            }}>
                                <Image source = {{uri: item.urlToImage}} style={{width:'100%',height:this.state.news[0].title == item.title ? featuredHeight : articleHeight, borderRadius:4}}></Image>
                                <Text  style={[styles.author, { fontSize:this.state.news[0].title == item.title ? 20 : 13,} ]}>{item.author}</Text>
                                <Text style={[styles.articleTitle, { fontSize:this.state.news[0].title == item.title ? 30 : 18,} ]} >{item.title}</Text>
                        </TouchableOpacity>    
                    )} 
                />
            </View>
        </View> 
    );
    }
 }

 const styles = StyleSheet.create({
    body: {
        flex: 1,
        width:'100%',
        backgroundColor:'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
      }, 
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
      width:'90%',
      marginLeft:'auto',
      marginRight:'auto',
    }, 
    title:{
        fontSize:40,
        fontWeight:'bold',
        color:'#FF1D4D',
    },
    sub:{
        color:'#D6CDCD',
        fontSize:18,
        marginBottom:'5%'
    },
    author:{
        color:'#D6CDCD',
        fontWeight:'bold',
        marginTop:'3%'
    },
    articleTitle:{
        color:'white',
        fontWeight:'bold',
        marginTop:'3%'
    }

 });