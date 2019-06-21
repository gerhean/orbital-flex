import React, { Component } from 'react';
import { Text, Container, Header, Body, 
    Title, Button, Card, Content, 
    Footer, FooterTab, Right, Left,
    CardItem, Thumbnail, Input } from 'native-base';
import firebase from 'firebase';
import { connect } from 'react-redux';
import scheduleUpdate from '../../actions';

class ScheduleForm extends Component {
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
                                placeholder="schedule and location"
                                value = { this.props.schedule_location }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'schedule_location', value: text
                                    })}
                            />
                        </CardItem>
                        <CardItem>
                            <Input 
                                placeholder="Specialty and price"
                                value = { this.specialty_price }
                                onChangeText = { text => this.props.scheduleUpdate({
                                        prop: 'specialty_price', value: text
                                    })}
                            />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { name, contact, schedule_location, specialty_price } = state.scheduleForm; // see reducers/index.js
    return { name, contact, schedule_location, specialty_price };
}

export default connect(mapStateToProps, { scheduleUpdate })(ScheduleForm);