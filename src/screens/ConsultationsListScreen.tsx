import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeBaseProvider, Button, Box, Center } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  specialty: string;
  status: string;
  username: string;
}

type ConsultationsListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultationsList'
>;

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const navigation = useNavigation<ConsultationsListScreenNavigationProp>();

  useEffect(() => {
    // Fetch consultations from the backend
    axios.get('http://localhost:3000/api/consultations')
      .then((response) => {
        setConsultations(response.data.consultations);
      })
      .catch((error) => {
        console.error('Erro ao buscar consultas:', error);
      });
  }, []);

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <Text>Paciente: {item.username}</Text>
      <Text>Data: {item.date}</Text>
      <Text>Médico: {item.doctor}</Text>
      <Text>Especialidade: {item.specialty}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <View style={styles.container}>
          <FlatList
            data={consultations}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Box mt={4}>
            <Button onPress={() => navigation.navigate('NewConsultation')}>
              Nova Consulta
            </Button>
          </Box>
        </View>
      </Center>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  consultationItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default ConsultationsListScreen;
