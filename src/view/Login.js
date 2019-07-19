import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label, Button} from 'native-base';
import firebase from 'react-native-firebase';
import {Spinner} from '../components/common';
import Reactotron from 'reactotron-react-native'

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            isLoading: false,
        };
    }

    loginPress = () => {
        const {email, password} = this.state;
        this.setState({error: '', isLoading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(this.onLoginFailed.bind(this));
            });
    };

    onLoginFailed(){
        this.setState({
           email: '',
           password: '',
           error: 'Authentication Error',
           isLoading: false
        });
    }

    onLoginSuccess() {

        this.setState({
            email: '',
            password: '',
            error: '',
            isLoading: false
        });

    }

    renderButton() {
        if (this.state.isLoading) {
            return <Spinner size="small"/>;
        }

        return (
            <Button block style={{marginTop: 20}} onPress={this.loginPress.bind(this)}>
                <Text style={{fontWeight: 'bold', color: '#fff'}}>Login</Text>
            </Button>
        );
    }


    render() {
        return (
            <Container>
                <Header/>
                <Content style={{padding: 10}}>
                    <Form>
                        <Item>
                            <Label>Email : </Label>
                            <Input
                                value={this.state.email}
                                onChangeText={(text) => this.setState({email: text})}
                            />
                        </Item>
                        <Item>
                            <Label>Password : </Label>
                            <Input
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                        </Item>
                        <Item>
                            <Text>{this.state.error}</Text>
                        </Item>

                        {this.renderButton()}

                    </Form>
                </Content>
            </Container>

        );
    }
}
