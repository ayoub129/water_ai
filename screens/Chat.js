import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, StyleSheet, Text, View, FlatList, TextInput , TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import micIcon from '../assets/mic.png'; 
import { Audio } from 'expo-av';

const getStatusBarHeight = () => {
  return Platform.OS === 'ios'? 20 : StatusBar.currentHeight;
};
const statusBarHeight = getStatusBarHeight();

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const apiKey = process.env.API_KEY;

  useEffect(() => {
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      await sendAudio(uri);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const sendAudio = async (audioFileUri) => {
    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
  
    const formData = new FormData();
    formData.append('file', audioFileUri); // Assuming audioFileUri is a string representing the URI
    formData.append('model', 'whisper-1');
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(response);
      }
  
      const data = await response.json();
      console.log('Transcription:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const sendMessage = async () => {
    if (message.trim() !== '') {
      setLoading(true);
  
      try {
        const response = await axios.post('https://api.example.com/messages', {
          message: message,
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        });
  
        const responseData = response.data; 
        setMessages([...messages, { id: messages.length + 1, text: message }]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRecordButton = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
      <TouchableOpacity onPress={handleRecordButton}>
        {
          isRecording ? <MaterialIcons name={"stop"} size={35} color="red" /> : <Image style={styles.record} source={micIcon} />
        }
      </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          onSubmitEditing={sendMessage}
        />
        <Text style={styles.sendButton} onPress={sendMessage}>
          Send
        </Text>
      </View>
      {loading && <ActivityIndicator size="small" color="#007bff" />}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight + 12,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'pace-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 10,
    color: '#fff',
  },
  record: {
    width: 35,
    height: 35,
  },
});