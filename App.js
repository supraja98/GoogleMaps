import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, Button, Alert, ListView, ScrollView, WebView} from 'react-native';
//import HeadersTop from ".//HeaderTop.js";
// You can import from local files
//import NavigationBar from 'react-native-navigation-bar';
//import api from './api.js'
//import { Container,Header,Title,Body} from 'native-base';
import { MapView } from 'expo';
export default class App extends Component {

	constructor(props){
      super(props);
      this.state={
		 source: '',
     dest: '',
    data: [],
    totdist:'',
    totdur:'',
    direct: '',
    dist: [],
    dur: [],
    instruct: [],
    rowDist:'', 
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
        
}
    }
 
	handleSource = (text) => {
      this.setState({ source: text })
   }
	handleDest = (text) => {
      this.setState({ dest: text })
   }
  _handleTextChange = inputValue => {
    this.setState({ inputValue });
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };
   _handleButtonPress = () => {

   
    fetch("https://app.brusqueness80.hasura-app.io/api", {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
     },
    body: JSON.stringify({
    origin: this.state.source,
    destination: this.state.dest,
  }),
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
	console.warn('Success:' , response)
   
    this.setState({
   		data: JSON.stringify(response.directions),
        totdist: JSON.stringify(response.distance),
		totdur: JSON.stringify(response.duration),
	})
	     let duration = []
         let distance = []
         let instr = []
 		 let rowData = ''
		 let finalRow = ''	
		let dir = response.directions;
		for(let i=0;i< dir.length;i++){
			distance.push(dir[i].distance);
			duration.push(dir[i].duration);
			instr.push(dir[i].html_instructions);
            finalRow="Distance:"+distance[i]+"\nDuration: "+duration[i]+"\nTravel:  "+instr[i];
            rowData = `${rowData} Step ${i} : \n ${finalRow} \n\n`;
}
  this.setState({
   		dist: distance,
        dur: duration,
        instruct: instr,
        rowDist: rowData,
	})
  
console.log('dist:',distance)
console.log('final:', rowData)

});
    Alert.alert(
      'Button pressed!' ,
       
    );
  };
  render() {
    
    return (
      
     <ScrollView>
      
      <View style={styles.container}>
		<Text style={styles.paragraph}>
			Google Maps
		</Text>
	   <View style={styles.block}>
     	<Image 
			 source={require('.//assets//sourcepin.png')}
			 style={{  margin: 5, height: 30, width: 30 }}
        />
        
          <TextInput style = {styles.input}
			 underlineColorAndroid = "transparent"
			 placeholder = "Enter Source"
             placeholderTextColor = "gray" 
			 autoCapitalize = "none"         
            onChangeText={this.handleSource}
          
          />   
      
		</View>
	  <View style={styles.block}>
    
		<Image 
			source={require('.//assets//destpin.png')} 
			 style={{  margin: 5, height: 30, width: 30 }}
          />
	 
	 <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Destination:"
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               onChangeText = {this.handleDest}
			
		/>  
    </View>
	   <Button 
          title="Travel time"
          onPress={this._handleButtonPress}
        />
		
       
         	<Text>
			Total distance:{this.state.totdist}{'\n'}
            Total duration:{this.state.totdur}{'\n'}
            </Text>
			<Text style={styles.paragraph}>
			Directions: 
			</Text>
			<Text style={styles.para}>{this.state.rowDist}{'\n'}
		
		</Text>
		
	    <MapView
            style={{ alignSelf: 'stretch', height: 500 }}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
          />
       
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
    backgroundColor: '#FAEBD7',
  },
  block:{
   flexDirection: 'row',
  },
  input: {
      margin: 5,
      height: 40,
	  width: 200,	
      borderColor: '#7a42f4',
      borderWidth: 1
   },
  para: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
	color: '#ff0000',
	backgroundColor: '#ffffff',
	borderColor: '#ffffff',
    borderWidth: 2
  },
  paragraph: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
	textAlign: 'center',
    color: '#ffffff',
	backgroundColor: '#008000',
	borderColor: '#008000',
    borderWidth: 2
  },

});
