import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Text, View, ScrollView, FlatList, Modal } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState ({});
  const [modalVisible, setModalVisible] = useState (false);

  const handleRemoveItem = (id) => {
    setModalVisible(true);
    setItemSelected(itemList.find(item => item.id === id))
  }

  const handleRemoveConfirm = () => {
    const newList = itemList.filter(item => item.id !== itemSelected.id);
    setItemList(newList);
    setModalVisible(false);
    setItemSelected({});
  }

  const handleChangeText = (text) => setInputText(text);
  const handleAddItem = () => {
    setItemList([
      ...itemList,
      {
        id: Math.random().toString(),
        value: inputText,
      },
    ]);
    setInputText('');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="item de Lista"
          style={styles.input}
          onChangeText={handleChangeText}
          value={inputText}
        />
        <Button
          title="ADD"
          color="#3D9970"
          onPress={handleAddItem}
        />
      </View>
      <FlatList
        data={itemList}
        renderItem={data => {
          return (
            <View style={styles.item}>
              <Text>{data.item.value}</Text>
              <Button title="X" color="#AAAAAA" onPress={() => handleRemoveItem(data.item.id)}/>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <View>
            <Text>Esta seguro que desea eliminar este item?</Text>
          </View>
          <View>
            <Text>{itemSelected.value}</Text>
          </View>
        </View>
        <View>
          <Button title="Confirmar" onPress={handleRemoveConfirm} color="#3D9970" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: '#BDEBC6',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
  },
  items: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});