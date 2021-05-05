import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import RoomItem from './RoomItem';

const RoomsList = ({ rooms }) => {
  const renderItem = ({ item }) => <RoomItem room={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(room) => room.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default RoomsList;
