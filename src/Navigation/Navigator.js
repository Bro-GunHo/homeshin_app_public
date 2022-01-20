import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';

import React from 'react';
import Login from '~/Page/Login/Login';
import SignComplete from '~/Page/Login/SignComplete/SignComplete';
import SignIn from '~/Page/Login/SignIn/SignIn';
import SignUp from '~/Page/Login/SignUp/SignUp';
import Terms from '~/Page/Login/Terms/Terms';
import ChemistryCheckEnroll from '~/Page/Main/ChemistryCheckEnroll/ChemistryCheckEnroll';
import CompanyIntro from '~/Page/Main/CompanyIntro/CompanyIntro';
import FreeBoard from '~/Page/Main/FreeBoard/FreeBoard';
import FreeBoardDetail from '~/Page/Main/FreeBoardDetail/FreeBoardDetail';
import FreeBoardEnroll from '~/Page/Main/FreeBoardEnroll/FreeBoardEnroll';
import Home from '~/Page/Main/Home';
import InspectionApply from '~/Page/Main/InspectionApply/InspectionApply';
import InspectionApply2 from '~/Page/Main/InspectionApply2/InspectionApply2';
import InspectionEdit from '~/Page/Main/InspectionEdit/InspectionEdit';
import InspectionComplete from '~/Page/Main/InspectionComplete/InspectionComplete';
import InspectionHistory from '~/Page/Main/InspectionHistroy/InspectionHistory';
import InspectionProblemEnroll from '~/Page/Main/InspectionProblemEnroll/InspectionProblemEnroll';

import InspectionForm from '~/Components/InspectionForm';
import ChemistryForm from '~/Components/ChemistryForm';

import InspectionUserDetail from '~/Page/Main/InspectionUserDetail/InspectionUserDetail';
import InspectionView from '~/Page/Main/InspectionView/InspectionView';
import InspectionViewDetail from '~/Page/Main/InspectionViewDetail/InspectionViewDetail';
import Leave from '~/Page/Main/Leave/Leave';
import Setting from '~/Page/Main/Setting/Setting';

import GalleryDetail from '~/shared/GalleryDetail';
import Word from '~/Page/Main/Word/Word';

import Auth from '~/Components/Auth';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        options={{title: '', headerTransparent: true, headerShown: false}}
        component={Auth}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignComplete"
        component={SignComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionApply"
        component={InspectionApply}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionApply2"
        component={InspectionApply2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionEdit"
        component={InspectionEdit}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="InspectionComplete"
        component={InspectionComplete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionView"
        component={InspectionView}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionViewDetail"
        component={InspectionViewDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionHistory"
        component={InspectionHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InspectionUserDetail"
        component={InspectionUserDetail}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="InspectionProblemEnroll"
        component={InspectionProblemEnroll}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="InspectionForm"
        component={InspectionForm}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="ChemistryCheckEnroll"
        component={ChemistryCheckEnroll}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ChemistryForm"
        component={ChemistryForm}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="FreeBoard"
        component={FreeBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreeBoardDetail"
        component={FreeBoardDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FreeBoardEnroll"
        component={FreeBoardEnroll}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompanyIntro"
        component={CompanyIntro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Leave"
        component={Leave}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="GalleryDetail"
        options={{
          title: '',
          headerTransparent: true,
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
        component={GalleryDetail}
      />
      <Stack.Screen
        name="Word"
        options={{
          title: '',
          headerTransparent: true,
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
        component={Word}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
