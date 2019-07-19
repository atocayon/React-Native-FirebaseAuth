import React from 'react';
import {View, ActivityIndicator} from 'react-native';


const Spinner = ({props}) => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={props || 'large'} />
        </View>
    );
}

export {Spinner};
