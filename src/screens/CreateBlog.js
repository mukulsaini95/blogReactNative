import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput } from 'react-native'
import { Context as BlogContext } from '../context/Context';
import { Feather } from "@expo/vector-icons"
const CreateBlog = ({ navigation, route }) => {
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params && route.params.id ? "Edit" : "Add"
		}, (navigation));
	}, [navigation])


	let { addPost, state, getAllBlogs } = useContext(BlogContext);
	const [payload, setPayload] = useState({ title: "", content: "" })

	const setState = (event, key) => {
		let originalPayload = { ...payload }
		originalPayload[key] = event.nativeEvent.text;
		setPayload(originalPayload);
	}


	useEffect(() => {
		if (route && route.params && route.params.id) {
			let payload = state.find(temp => temp.id === route.params.id);
			console.log('payload: ', payload);
			setPayload(payload);
		}
	}, [])


	// console.log('blogDetail: ', blogDetail);
	return <View style={{ flex: 1 }}>
		<View style={styles.container}>
			<View style={{padding:5}}>
				<Text style={styles.text}>Enter Title</Text>
				<TextInput style={styles.input} value={payload.title} onChange={text => setState(text, "title")} ></TextInput>
			</View>
			<View style={{padding:5}}>
				<Text style={styles.text}>Enter Content</Text>
				<TextInput style={styles.input} value={payload.content} onChange={text => setState(text, "content")} ></TextInput>
			</View>
			<View style={{margin:20}}>
				
			<Button title="Save" onPress={() => {
				addPost(payload, () => {
					navigation.pop();
				});
			}}></Button>
			</View>
		</View>
	</View>
}


const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	input: {
		borderWidth: 1,
		padding: 5,
		width: "100%"
	},
	text: {
		fontSize: 20,
	},
})

export default CreateBlog;