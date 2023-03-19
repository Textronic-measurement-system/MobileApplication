import React from 'react';
import {
    Button,
    ChevronLeftIcon,
    HStack,
    NativeBaseProvider,
    SearchIcon,
    Text,
    View,
} from 'native-base';
import { headerComponent } from './style/HeaderStyle';
interface Props {
    navigation: any;
    goto: any;
    refreshing: React.ReactNode;
    title: React.ReactNode;
}

const RefreshButton = (value: any) => {
    if (value === 'enable') {
        return (
            <Button style={headerComponent.button2}>
                <SearchIcon size="8" color={'rgb(0, 0, 0)'} />
            </Button>
        );
    }
};

export const Header = function ({
    navigation,
    goto,
    refreshing,
    title,
}: Props): JSX.Element {
    return (
        <NativeBaseProvider>
            <View style={headerComponent.container}>
                <HStack>
                    <Button
                        style={headerComponent.button1}
                        onPress={() => navigation.navigate(goto)}>
                        <ChevronLeftIcon size="8" color={'rgb(0, 0, 0)'} />
                    </Button>
                    {RefreshButton(refreshing)}
                </HStack>
                <Text style={headerComponent.title}>{title}</Text>
            </View>
        </NativeBaseProvider>
    );
};
