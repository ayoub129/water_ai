import React from 'react';
import { StatusBar, Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors } from '../constant/styles';

const getStatusBarHeight = () => {
  return Platform.OS === 'ios'? 20 : StatusBar.currentHeight;
};
const statusBarHeight = getStatusBarHeight();

const Home = () => {
  // Sample data for the list
  const data = [
    { id: 1, title: '1 Litre' , time: "12:45 PM" },
    { id: 2, title: '12 Litre', time: "06:00 AM" },
    { id: 3, title: '8 Litre', time: "10:15 AM" },
    { id: 4, title: '6 Litre', time: "16:45 PM" },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemTitle}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Water Consumption</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight + 12,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
  },
  itemTitle: {
    fontSize: 16,
  },
  listContainer: {
    marginTop: 30
  }
});