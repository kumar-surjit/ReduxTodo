import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {addTask, deleteTask, editTask} from './src/redux/actions';
import store from './src/redux/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './src/styles/colors';
import MyModal from './src/Components/MyModal';

export default class App extends Component {
  state = {
    modalVisible: false,
    titleInputText: '',
    descriptionInputText: '',
    statusInputText: '',
    label: '',
    editTaskId: null,
    status: null,
    unsubscribe: null,
  };

  inputTextHandler = (type, value) => {
    // console.log(type, value);
    switch (type) {
      case 'title':
        this.setState({titleInputText: value});
        break;
      case 'description':
        this.setState({descriptionInputText: value});
        break;
      case 'status':
        this.setState({status: value});
        break;
      default:
        break;
    }
    // console.log(task);
  };

  statusHandler = value => {
    console.log('value is here: ', value);
    this.setState({status: value});
  };

  addButtonClicked = () => {
    this.setState({
      label: 'Add Task',
      modalVisible: true,
      titleInputText: '',
      descriptionInputText: '',
      status: null,
    });
  };

  addTodo = () => {
    const {
      titleInputText,
      descriptionInputText,
      status,
      modalVisible,
    } = this.state;
    if (titleInputText === '' && descriptionInputText === '') {
      alert('please enter a task');
    } else {
      if (status === null) addTask(titleInputText, descriptionInputText);
      else addTask(titleInputText, descriptionInputText, status);
      this.setModalVisible(!modalVisible);
    }
  };

  editButtonClicked = item => {
    // console.log(title);
    this.setState({
      label: 'Save Changes',
      modalVisible: true,
      titleInputText: item.title,
      descriptionInputText: item.description,
      statusInputText: item.status,
      editTaskId: item.id,
    });
  };

  saveEditTaskChanges = () => {
    const {
      editTaskId,
      titleInputText,
      descriptionInputText,
      status,
      modalVisible,
    } = this.state;
    // console.log(titleInputText);
    if (editTaskId !== null) {
      editTask(editTaskId, titleInputText, descriptionInputText, status);
      this.setModalVisible(!modalVisible);
    }
  };

  onDelete = id => {
    console.log('delete: ', id);
    Alert.alert('Delete Task', 'Are you sure, you want to delete this task?', [
      {text: 'Cancel'},
      {text: 'OK', onPress: () => deleteTask(id)},
    ]);
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  _renderItem = ({item, index}) => (
    <View
      // style={[styles.itemStyle, item.status === "Pending" ? {backgroundColor: colors.themeRed}: {backgroundColor: "#00d696"}]}
      style={styles.itemStyle}>
      <View style={styles.itemHeaderContainer}>
        <Text style={styles.itemHeadingTextStyle}>{item.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.iconsSpacing}
            onPress={() => this.editButtonClicked(item)}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onDelete(item.id)}>
            <MaterialCommunityIcons name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.itemDescriptionStyle}>{item.description}</Text>
      <Text style={styles.itemDescriptionStyle}>Status: {item.status}</Text>
    </View>
  );

  componentDidMount = () => {
    store.subscribe(() => this.setState({}));
  };

  render() {
    const {
      modalVisible,
      titleInputText,
      descriptionInputText,
      status,
      label,
    } = this.state;
    const {tasks} = store.getState();
    // console.log(tasks);
    return (
      <View style={{flex: 1}}>
        <View style={styles.appBar}>
          <Text style={styles.appBarHeading}>Todo App</Text>
        </View>
        <FlatList
          data={tasks}
          renderItem={this._renderItem}
          style={{marginTop: 8}}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={this.addButtonClicked}>
          <MaterialCommunityIcons name="plus" size={40} color="#fff" />
        </TouchableOpacity>
        <MyModal
          modalVisible={modalVisible}
          setModalVisible={this.setModalVisible}
          inputTextHandler={this.inputTextHandler}
          addTodo={this.addTodo}
          editTodo={this.saveEditTaskChanges}
          title={titleInputText}
          description={descriptionInputText}
          status={status}
          label={label}
          statusHandler={this.statusHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: colors.themeRed,
    alignItems: 'center',
    paddingVertical: 15,
  },
  appBarHeading: {color: '#fff', fontSize: 22},
  floatingButton: {
    backgroundColor: colors.themeRed,
    borderRadius: 60 / 2,
    position: 'absolute',
    bottom: 20,
    right: 15,
    padding: 5,
  },
  itemStyle: {
    backgroundColor: colors.themeRed,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemHeadingTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemDescriptionStyle: {
    fontSize: 16,
    color: '#fff',
  },
  iconsSpacing: {
    marginRight: 8,
  },
});
