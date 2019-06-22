import React, { Component } from 'react';
import { Text, Container, Header, Body, 
    Title, Button, Card, Content, 
    Footer, FooterTab, Right, Left,
    CardItem, Thumbnail, Input } from 'native-base';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { scheduleUpdate, scheduleCreate } from '../../actions';

class ScheduleForm extends Component {

    onButtonPress = () => {
        const { name, contact, time, location, specialty, price } = this.props;
        this.props.scheduleCreate({ name, contact, time, location, specialty, price });
    }
    
    render() {
        return(
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Input 
                                placeholder="Name"
                                value = { this.props.name }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'name', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Contact details"
                                value = { this.props.contact }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'contact', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Time"
                                value = { this.props.time }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'time', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Location"
                                value = { this.props.location }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'location', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Specialty"
                                value = { this.props.specialty }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'specialty', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Price"
                                value = { this.props.price }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'price', value: text
                                    })}
                            />
                        </CardItem>
                    </Card>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { name, contact, time, location, specialty, price } = state.scheduleForm;
    return { name, contact, time, location, specialty, price };
}

export default connect(mapStateToProps, { scheduleUpdate, scheduleCreate })(ScheduleForm);