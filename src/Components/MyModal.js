import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../styles/colors';
import {Dropdown} from 'react-native-material-dropdown';

export default class MyModal extends Component {
  handleSubmit = () => {
    const {label} = this.props;
    let tempStr = label.toLowerCase();
    // console.log(tempStr);
    if (tempStr.includes('add')) this.props.addTodo();
    else if (tempStr.includes('save')) this.props.editTodo();
  };

  render() {
    const {modalVisible, title, description, status, label} = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.props.setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback
          // onPress={() => this.props.setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Enter Title here..."
                  value={title}
                  onChangeText={value =>
                    this.props.inputTextHandler('title', value)
                  }
                  style={[styles.inputFieldStyle, {marginBottom: 6}]}
                />
                <TextInput
                  placeholder="Enter Description here..."
                  value={description}
                  onChangeText={value =>
                    this.props.inputTextHandler('description', value)
                  }
                  style={[styles.inputFieldStyle, {marginBottom: 6}]}
                />
                <TextInput
                  placeholder="Enter status here..."
                  value={status}
                  onChangeText={value =>
                    this.props.inputTextHandler('status', value)
                  }
                  style={styles.inputFieldStyle}
                />

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={this.handleSubmit}>
                  <Text style={styles.textStyle}>{label}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
    marginTop: 25,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.themeLightRed,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderColor: '#525252',
    borderRadius: 50,
    paddingHorizontal: 20,
    height: 40,
  },
});
