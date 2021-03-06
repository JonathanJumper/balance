import React, { Component } from 'react'
import { ScrollView, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Header } from "react-native-elements"
import HeaderButton from "../../Components/HeaderButton"
import RoundedButton from "../../Components/RoundedButton"
import ValuesActions, { addSugarLevel } from "../../Redux/ValuesRedux"
import DatePicker from 'react-native-datepicker'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './../Styles/AddEventScreenStyle'
import colors from "../../Themes/Colors"

class AddMeasure extends Component {

   constructor(props) {
      super(props);
      this.state = {
         sugarLevel: 0,
         date: this.getDatetime()
      };
   }

   getDatetime() {
      let moment = require('moment');
      moment.locale('de');
      let date = Date.now();
      let formattedDate = moment(date).format('LLL');
      return formattedDate
   }

   addSugarLevel = () => {
      if (!this.state.sugarLevel) {
         alert("Ingrese una cantidad")
      }
      else if (this.state.sugarLevel < 10 || this.state.sugarLevel > 200) {
         alert("Ingrese una cantidad valida")
      }
      else {
         const { navigate } = this.props.navigation
         this.props.addTheSugarLevel({ type: 1, sugarLevel: Number.parseInt(this.state.sugarLevel), date: this.state.date })
         navigate('HomeScreen')
      }
   }

   render() {
      const { navigate } = this.props.navigation
      return (
         <KeyboardAvoidingView style={styles.container}>

            <Text style={styles.sectionText}>
               Favor Ingrese el nivel de azucar actual en sangre
            </Text>

            <TextInput style={styles.textInput}
               placeholder={String(this.props.calculatedInsuline)}
               onChangeText={(sugarLevel) => this.setState({ sugarLevel })}
               keyboardType='numeric'
            />

            <DatePicker
               style={styles.datePickerContainer}
               customStyles={{ dateInput: { borderWidth: 0 } }}
               date={this.state.date}
               mode="datetime"
               format="MMMM Do YYYY, h:mm:ss a"
               confirmBtnText="Confirmar"
               cancelBtnText="Cancelar"
               showIcon={false}
               onDateChange={(date) => { this.setState({ date: date }) }}
            />

            <RoundedButton
               onPress={this.addSugarLevel}>
               Registrar Medicion
            </RoundedButton>

         </KeyboardAvoidingView>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      calculatedInsuline: state.values.calculatedInsuline
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addTheSugarLevel: (sugarLevel) => { dispatch(ValuesActions.addSugarLevel(sugarLevel)) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeasure)
