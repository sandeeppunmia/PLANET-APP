import React, { Component }  from "react";
import {View,Text,Stylesheet,Image, Alert} from "react-native";
import {Card} from "react-native-elements";

export default class Details extends Component{
    constructor(props){
        super(props)
        this.state={
            details:{},
            imagePath:'',
            url:'`http://localhost:5000/planet?name=${this.props.navigation.getParam( "planet_name" )}'
        }
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails=()=>{
        const {url}=this.state
        axios
        .get(url)
        .then(response=>{
            this.setDetails(response.data.data)
        })
        .catch(error=>{
            Alert.alert(error.message())
        })
    }

    setDetails=planet_details=>{
        const planet_type=planet_details.planet_type
        let imagePath = "";
        switch(planet_type){
            case "Gas Giant":
                imagePath = require("../images/gas_giant.png");
                break;
            case "Terrestial":
                imagePath = require("../images/terrestrial.png");
                break;
            case "Super Earth":
                imagePath = require("../images/super_earth.png");
                break;
            case "Neptune Like":
                imagePath = require("../images/neptune_like.png");
                break
            default:
                imagePath = require("../images/gas_giant.png");
        }
        this.setState({
            details:planet_details,
            imagePath:imagePath
        })
    }

    render(){
        const {details,imagePath} = this.state
        if(details.specifications){
            return(
                <View style={styles.container}>
                   <Card title={details.name}
                         image={imagePath}
                         imageProps={{resizeMode:"contain",width:"100%"}}
                         >
                       <View>
                           <Text style={styles.CardItem}>{`Distance From Earth: ${details.distance_from_earth}`}</Text>
                           <Text style={styles.CardItem}>{`Distance From Sun: ${details.distance_from_their_sun}`}</Text>
                           <Text style={styles.CardItem}>{`Gravity: ${details.gravity}`}</Text>
                           <Text style={styles.CardItem}>{`Orbital Period: ${details.orbital_period}`}</Text>
                           <Text style={styles.CardItem}>{`Orbital Speed: ${details.orbital_speed}`}</Text>
                           <Text style={styles.CardItem}>{`Planet Mass: ${details.planet_mass}`}</Text>
                           <Text style={styles.CardItem}>{`Planet Radius: ${details.planet_radius}`}</Text>
                           <Text style={styles.CardItem}>{`Planet Type: ${details.planet_type}`}</Text>
                       </View>
                       <View style={[styles.CardItem,{flexDirection:"column"}]}>
                           <Text>{details.specifications?`specifications:`:""}</Text>
                           {
                               details.specifications.map((item,index)=>(
                                   <View style={[styles.CardItem,{flexDirection:"column"}]}>
                                       <Text key={index.toString()} style={{marginLeft:50}}>
                                           {item}
                                        </Text>
                                   </View>
                               ))
                           }
                       </View>
                    </Card> 
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1 
    }, 
    cardItem: { 
        marginBottom: 10 
    } 
});