import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import { Context as BlogContext } from '../context/Context';
import { Feather } from "@expo/vector-icons"
const BlogDetails = ({ route }) => {
	let { state } = useContext(BlogContext);
	let blogDetail = state.find(temp => temp.id === route.params.id)
	// console.log('blogDetail: ', blogDetail);
	return <View style={{ flex: 1 }}>
		<Text style={{fontSize:36,borderBottomWidth:2,backgroundColor:"black",color:"white"}}>{blogDetail.title}</Text>
		<Text style={{fontSize:24}}>{blogDetail.content}</Text>
	</View>
}


const styles = StyleSheet.create({
	view: {
		borderBottomWidth: 2,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		width: "100%",
		borderColor: 'black'
	}
})

export default BlogDetails;