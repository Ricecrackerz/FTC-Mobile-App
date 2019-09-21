import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TemplateInfoPage from '@components/TemplateInfoPage';
import Res from '@resources';

export default class WorkshopsPage extends Component {
    render() {
        return (
          <TemplateInfoPage
          title={Res.strings.workshops.title}
          image={Res.strings.workshops.image}
          header={Res.strings.workshops.header}
          body = {Res.strings.workshops.body}/>
        );
    }
}