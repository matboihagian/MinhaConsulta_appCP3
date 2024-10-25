import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, Text, Select, CheckIcon } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NewConsultationScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'NewConsultation'
>;

type Props = {
    navigation: NewConsultationScreenNavigationProp;
};

const NewConsultationScreen = ({ navigation }: Props) => {
    const [patientName, setPatientName] = useState('');
    const [consultationDate, setConsultationDate] = useState('');
    const [doctor, setDoctor] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateConsultation = async () => {
    if (!patientName || !consultationDate || !doctor || !specialty || !status) {
        setMessage('Todos os campos são obrigatórios.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/consultations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientName, consultationDate, doctor, specialty, status }),
        });

        const data = await response.json();
        if (!response.ok) {
        setMessage(data.message || 'Erro desconhecido');
        } else {
        setMessage('Consulta criada com sucesso!');
        navigation.goBack();
        }
    } catch (error) {
        console.error('Erro:', error);
        setMessage('Erro ao criar consulta.');
    }
    };

    return (
    <NativeBaseProvider>
        <Center flex={1} bg="white">
        <Box>
            <Input
            placeholder="Nome do Paciente"
            mb={4}
            value={patientName}
            onChangeText={setPatientName}
            />
            <Input
            placeholder="Data da Consulta"
            mb={4}
            value={consultationDate}
            onChangeText={setConsultationDate}
            />
            <Input
            placeholder="Médico"
            mb={4}
            value={doctor}
            onChangeText={setDoctor}
            />
            <Input
            placeholder="Especialidade"
            mb={4}
            value={specialty}
            onChangeText={setSpecialty}
            />
            <Select
            selectedValue={status}
            minWidth="200"
            placeholder="Status da Consulta"
            mb={4}
            onValueChange={itemValue => setStatus(itemValue)}
            _selectedItem={{

                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
            }}
        >
            <Select.Item label="Pendente" value="pending" />
            <Select.Item label="Confirmada" value="confirmed" />
            <Select.Item label="Cancelada" value="cancelled" />
        </Select>
        {message ? <Text color="red.500" mb={4}>{message}</Text> : null}
        <Button onPress={handleCreateConsultation}>
            Criar Consulta
        </Button>
        </Box>
    </Center>
    </NativeBaseProvider>
);
};

export default NewConsultationScreen;
