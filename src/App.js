import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useMemo } from 'react';
const departments = [
  // { id: 'pm' , name: 'PM - Oezmeral Hueseyin'  },
  // { id: 'pc' , name: 'PC - Constantinescu Monica'  },
  { id: 'mse', name: 'MSE - Touhent Hassene' },
  { id: 'tef', name: 'TEF - Touhent Hassene' },
  { id: 'qmm', name: 'QMM - Keiser Reimund' },
  { id: 'qmml', name: 'QMM-L - Rusu Marius' },
  { id: 'ctg', name: 'CTG - Heber Pascale' },
  { id: 'hrl', name: 'HRL - Motoc Simina' },
  { id: 'log', name: 'LOG - Hastemir Bekir' },
  { id: 'fcm', name: 'FCM - Gyori Botond' },
];

const projects = {
  pm:  ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  pc:  ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  mse: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  tef: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  qmm: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  qmml: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  ctg: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  hrl: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  log: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down'],
  fcm: ['FC 100x higher on QFN 48 pin', 'FABS2 EOL Tester', 'MOE3 Milling Pool - PCB edge delamination ', 'IvecoMux safety incident with shelfcarriers 1', 'D716 Damaged component ', 'JLR Ford parts mix', 'PSS - Laser Marking Machine safety errors', 'Deviatie de contur Milling 225', 'ECA_M2_Scontrol_Pseudo Failures', 'DASy Enhanced MARVEL eFUse_8D_report', 'SKD16 VC1CP019 pushed-out bushings ', 'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO', 'Internal transport damage', 'Damage component –coil L414_1', 'Prevention of Retractable Clamp Detachment', 'Person injured by falling down']
};

const defineProjects ={

    'FC 100x higher on QFN 48 pin': 'MOE1',
    'FABS2 EOL Tester': 'MOE2',
    'MOE3 Milling Pool - PCB edge delamination ': 'TEF',
    'IvecoMux safety incident with shelfcarriers 1': 'MOE4',
    'D716 Damaged component ': 'MOE4',
    'JLR Ford parts mix': 'LOG',
    'PSS - Laser Marking Machine safety errors': 'TEF',
    'Deviatie de contur Milling 225': 'MOE3',
    'ECA_M2_Scontrol_Pseudo Failures': 'MOE3',
    'DASy Enhanced MARVEL eFUse_8D_report': 'MOE5',
    'SKD16 VC1CP019 pushed-out bushings ': 'MOE2',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'MOE1',
    'Internal transport damage': 'LOG',
    'Damage component –coil L414_1': 'MOE5',
    'Prevention of Retractable Clamp Detachment': 'MOE1',
    'Person injured by falling down': 'MOE2'
    
};

const defineProjectLeader = {
    'FC 100x higher on QFN 48 pin': 'Jeong Jaewon',
    'FABS2 EOL Tester': 'Eissa Ahmed',
    'MOE3 Milling Pool - PCB edge delamination ': 'Batan Alexandru',
    'IvecoMux safety incident with shelfcarriers 1': 'Pop Daniel ',
    'D716 Damaged component ': 'Faur Darius',
    'JLR Ford parts mix': 'Monica Jucan',
    'PSS - Laser Marking Machine safety errors': 'Florean Mihai',
    'Deviatie de contur Milling 225': 'Negreanu Daniel',
    'ECA_M2_Scontrol_Pseudo Failures': 'Tyukodi Krisztian',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Tanase Ionut',
    'SKD16 VC1CP019 pushed-out bushings ': 'Pieper Steffen',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Sava Paul-Melinte',
    'Internal transport damage': 'Aiben Mihai',
    'Damage component –coil L414_1': 'Miclea Iulia Laura',
    'Prevention of Retractable Clamp Detachment': 'Megyesi Lorand',
    'Person injured by falling down': 'Boda Mihai-Adrian'
};

const initialNotes = {
  pm: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin PM',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester PM',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  PM',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 PM',
    'D716 Damaged component ': 'Notes D716 Damaged component  PM',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix PM',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors PM',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 PM',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures PM',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report PM',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  PM',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PM',
    'Internal transport damage': 'Notes Internal transport damage PM',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1PM',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment PM',
    'Person injured by falling down': 'Notes Person injured by falling down PM'
  },

  pc: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin PC',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester PC',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  PC',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 PC',
    'D716 Damaged component ': 'Notes D716 Damaged component  PC',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix PC',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors PC',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 PC',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures PC',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report PC',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  PC',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO PC',
    'Internal transport damage': 'Notes Internal transport damage PC',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1PC',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment PC',
    'Person injured by falling down': 'Notes Person injured by falling down PC'
  },

  mse: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin MSE',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester MSE',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  MSE',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 MSE',
    'D716 Damaged component ': 'Notes D716 Damaged component  MSE',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix MSE',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors MSE',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 MSE',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures MSE',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report MSE',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  MSE',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO MSE',
    'Internal transport damage': 'Notes Internal transport damage MSE',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1MSE',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment MSE',
    'Person injured by falling down': 'Notes Person injured by falling down MSE'
  },

  tef: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin TEF',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester TEF',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  TEF',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 TEF',
    'D716 Damaged component ': 'Notes D716 Damaged component  TEF',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix TEF',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors TEF',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 TEF',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures TEF',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report TEF',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  TEF',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO TEF',
    'Internal transport damage': 'Notes Internal transport damage TEF',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1TEF',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment TEF',
    'Person injured by falling down': 'Notes Person injured by falling down TEF'
  },

  qmm: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin QMM',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester QMM',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  QMM',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 QMM',
    'D716 Damaged component ': 'Notes D716 Damaged component  QMM',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix QMM',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors QMM',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 QMM',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures QMM',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report QMM',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  QMM',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM',
    'Internal transport damage': 'Notes Internal transport damage QMM',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1QMM',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment QMM',
    'Person injured by falling down': 'Notes Person injured by falling down QMM'
  },

  qmml: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin QMM-L',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester QMM-L',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  QMM-L',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 QMM-L',
    'D716 Damaged component ': 'Notes D716 Damaged component  QMM-L',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix QMM-L',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors QMM-L',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 QMM-L',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures QMM-L',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report QMM-L',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  QMM-L',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO QMM-L',
    'Internal transport damage': 'Notes Internal transport damage QMM-L',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1QMM-L',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment QMM-L',
    'Person injured by falling down': 'Notes Person injured by falling down QMM-L'
  },

  ctg: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin CTG',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester CTG',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  CTG',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 CTG',
    'D716 Damaged component ': 'Notes D716 Damaged component  CTG',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix CTG',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors CTG',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 CTG',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures CTG',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report CTG',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  CTG',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO CTG',
    'Internal transport damage': 'Notes Internal transport damage CTG',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1CTG',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment CTG',
    'Person injured by falling down': 'Notes Person injured by falling down CTG'
  },

  hrl: {
    'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin HRL',
    'FABS2 EOL Tester': 'Notes FABS2 EOL Tester HRL',
    'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  HRL',
    'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 HRL',
    'D716 Damaged component ': 'Notes D716 Damaged component  HRL',
    'JLR Ford parts mix': 'Notes JLR Ford parts mix HRL',
    'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors HRL',
    'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 HRL',
    'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures HRL',
    'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report HRL',
    'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  HRL',
    'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO HRL',
    'Internal transport damage': 'Notes Internal transport damage HRL',
    'Damage component –coil L414_1': 'Notes Damage component –coil L414_1HRL',
    'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment HRL',
    'Person injured by falling down': 'Notes Person injured by falling down HRL',
  },

    log: {
      'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin LOG',
      'FABS2 EOL Tester': 'Notes FABS2 EOL Tester LOG',
      'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  LOG',
      'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 LOG',
      'D716 Damaged component ': 'Notes D716 Damaged component  LOG',
      'JLR Ford parts mix': 'Notes JLR Ford parts mix LOG',
      'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors LOG',
      'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 LOG',
      'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures LOG',
      'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report LOG',
      'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  LOG',
      'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO LOG',
      'Internal transport damage': 'Notes Internal transport damage LOG',
      'Damage component –coil L414_1': 'Notes Damage component –coil L414_1LOG',
      'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment LOG',
      'Person injured by falling down': 'Notes Person injured by falling down LOG',
    },
  
    fcm: {
      'FC 100x higher on QFN 48 pin': 'Notes FC 100x higher on QFN 48 pin FCM',
      'FABS2 EOL Tester': 'Notes FABS2 EOL Tester FCM',
      'MOE3 Milling Pool - PCB edge delamination ': 'Notes MOE3 Milling Pool - PCB edge delamination  FCM',
      'IvecoMux safety incident with shelfcarriers 1': 'Notes IvecoMux safety incident with shelfcarriers 1 FCM',
      'D716 Damaged component ': 'Notes D716 Damaged component  FCM',
      'JLR Ford parts mix': 'Notes JLR Ford parts mix FCM',
      'PSS - Laser Marking Machine safety errors': 'Notes PSS - Laser Marking Machine safety errors FCM',
      'Deviatie de contur Milling 225': 'Notes Deviatie de contur Milling 225 FCM',
      'ECA_M2_Scontrol_Pseudo Failures': 'Notes ECA_M2_Scontrol_Pseudo Failures FCM',
      'DASy Enhanced MARVEL eFUse_8D_report': 'Notes DASy Enhanced MARVEL eFUse_8D_report FCM',
      'SKD16 VC1CP019 pushed-out bushings ': 'Notes SKD16 VC1CP019 pushed-out bushings  FCM',
      'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': 'Notes Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO FCM',
      'Internal transport damage': 'Notes Internal transport damage FCM',
      'Damage component –coil L414_1': 'Notes Damage component –coil L414_1FCM',
      'Prevention of Retractable Clamp Detachment': 'Notes Prevention of Retractable Clamp Detachment FCM',
      'Person injured by falling down': 'Notes Person injured by falling down FCM',
    },
  };

const departmentCriteria = {
  'pm': ["D1 and D2", "Involvement of associates"],
  'pc': ["D1 and D2", "Involvement of associates"],
  'mse': ["D1 and D2", "Involvement of associates"],
  'tef': ["D1 and D2", "Involvement of associates"],
  'qmm': ["D1 and D2", "Involvement of associates"],
  'qmml': ["D1 and D2", "Involvement of associates"],
  'ctg': ["D1 and D2", "Involvement of associates"],
  'hrl': ["D1 and D2", "Involvement of associates"],
  'log': ["D1 and D2", "Involvement of associates"],
  'fcm': ["D1 and D2", "Involvement of associates"]
};

function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [notes, setNotes] = useState(initialNotes);


  // Stare pentru rating-urile pentru fiecare categorie pentru fiecare proiect
  const [projectRatings, setProjectRatings] = useState({});
  useEffect(() => {
    // La schimbarea proiectului, verificați dacă există rating-uri pentru proiectul selectat
    if (selectedProject) {
      if (!projectRatings[selectedProject]) {
        // Dacă nu există rating-uri pentru proiectul selectat, inițializați-le cu rating-uri goale
        setProjectRatings((prevRatings) => ({
          ...prevRatings,
          [selectedProject]: {
            category1: 0,
            category2: 0,
            category3: 0,
            category4: 0,
          },
        }));
      }
    }
  }, [selectedProject, projectRatings]); // Adăugați projectRatings ca o dependență aici


  useEffect(() => {
    const loadDataFromLocalStorage = () => {
      const savedData = localStorage.getItem('appData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setSelectedDepartment(parsedData.selectedDepartment || '');
        setSelectedProject(parsedData.selectedProject || '');
        setProjectRatings(parsedData.projectRatings || {});
        setNotes(parsedData.projectNotes || {}); // Adaugăm încărcarea notelor
      }
    };

    loadDataFromLocalStorage();
  }, []); // rulează la încărcarea componentei

  const saveToLocalStorage = () => {
    const dataToSave = {
      selectedDepartment,
      selectedProject,
      projectRatings,
      projectNotes:notes
    };
    localStorage.setItem('appData', JSON.stringify(dataToSave));
  };

  const resetAppData = () => {
    localStorage.removeItem('appData');
    setSelectedDepartment('');
    setSelectedProject('');
    setProjectRatings({});
    setNotes('');
  };


  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedProject('');
    setNotes('');
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    saveToLocalStorage(); // Salvare la schimbarea proiectului
  };

  const handleRatingChange = (project, category, rating) => {
    // Actualizați rating-urile pentru proiectul și categoria selectate
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [project]: {
        ...prevRatings[project],
        [category]: rating,
      },
    }));
    saveToLocalStorage(); // Salvare la acordarea unui rating
  };

  const handleNotesChange = (e) => {
    const updatedNotes = { ...notes };
    if (!updatedNotes[selectedDepartment]) {
      updatedNotes[selectedDepartment] = {};
    }
    updatedNotes[selectedDepartment][selectedProject] = e.target.value;
    setNotes(updatedNotes);
    saveToLocalStorage(); // Salvare la schimbarea notelor
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Adăugăm 'projectNumber' ca al doilea parametru aici
    const calculateDataForProject = (ratings, projectNumber) => {
      const psMethodAverage = (ratings['category1'] + ratings['category2'] + ratings['category3'] + ratings['category4']);
      const kpiImprovementAverage = (ratings['kpi-improvement-category1'] + ratings['kpi-improvement-category2'] + ratings['kpi-improvement-category3']);
      // Obținem notele pentru proiectul curent bazat pe 'projectNumber'
      const projectNotes = notes[selectedDepartment]?.[projects[selectedDepartment][projectNumber - 1]] || '';
  
      return {
        "D1 and D2": psMethodAverage,
        "Involvement of associates": kpiImprovementAverage,
        Notes: projectNotes,
      };
    };

    const getURLForProject = (sheetId, projectNumber, rowToUpdate) => {
      return `https://api.sheetbest.com/sheets/${sheetId}/tabs/Project ${projectNumber}/${rowToUpdate}`;
    }
    
    const sheetId = "73dd3db3-a6cf-4f14-b772-0081f4f07507";
    
    const departmentIndex = departments.findIndex(dept => dept.id === selectedDepartment);
    const rowToUpdate = departmentIndex !== -1 ? departmentIndex : 0;
  
    const promises = [];
  
    for (let i = 0; i <=15; i++) {
      const currentProjectName = projects[selectedDepartment][i];
      const currentProjectRatings = projectRatings[currentProjectName];

      if (!currentProjectRatings) {
          console.warn(`Nu există ratinguri pentru Proiectul ${currentProjectName}`);
          continue;
      }
      const data = calculateDataForProject(currentProjectRatings, i + 1);
      const url = getURLForProject(sheetId, i + 1, rowToUpdate);
      promises.push(axios.patch(url, data));
    }
  
    Promise.all(promises)
      .then(responses => {
        console.log('Toate datele au fost trimise cu succes');
        setNotes('');
        setLoading(false);
        setProgress(0);
        // Afișați un mesaj către utilizator pentru succes
            alert('Data was succesfully send!Thank you!');
            // Resetați și rating-urile pentru toate proiectele

            setProjectRatings({
                'FC 100x higher on QFN 48 pin': resetRatings(),
                'FABS2 EOL Tester': resetRatings(),
                'MOE3 Milling Pool - PCB edge delamination ': resetRatings(),
                'IvecoMux safety incident with shelfcarriers 1': resetRatings(),
                'D716 Damaged component ': resetRatings(),
                'JLR Ford parts mix': resetRatings(),
                'PSS - Laser Marking Machine safety errors': resetRatings(),
                'Deviatie de contur Milling 225': resetRatings(),
                'ECA_M2_Scontrol_Pseudo Failures': resetRatings(),
                'DASy Enhanced MARVEL eFUse_8D_report': resetRatings(),
                'SKD16 VC1CP019 pushed-out bushings ': resetRatings(),
                'Reduction of insufficient printing for bus bar components - DCDC Gen3 EVO': resetRatings(),
                'Internal transport damage': resetRatings(),
                'Damage component –coil L414_1': resetRatings(),
                'Prevention of Retractable Clamp Detachment': resetRatings(),
                'Person injured by falling down': resetRatings(),
            });
            resetAppData();
        })
        .catch(error => {
            console.error('A apărut o eroare la trimiterea datelor:', error);
            if (error.response) {
                console.error('Răspuns de la server:', error.response.data);
            }
            setLoading(false);//Dezactiveaza starea de incarcare in caz de eroare
            setProgress(0); //Resetati progresul la 0
        });    
}

const resetRatings = () => {
    return {
        category1: 0,
        category2: 0,
        category3: 0,
        category4: 0,
    };
}

//<-----------------------------------------Export Data-------------------------------------------->
const renderRatings = (project, category, maxRating) => {
  const ratingsArray = Array.from({ length: maxRating }, (_, i) => i + 1);

  // Pentru a actualiza un rating specific
  const handleSingleRatingChange = (project, category, rating) => {
    // Setează ratingul pentru categoria specificată
    handleRatingChange(project, category, rating);
  };

  return (
    <div className="ratings">
      {ratingsArray.map((rating, index) => (
        <div
          key={rating}
          className={`rating-option ${
            projectRatings[project]?.[category] === rating ? 'selected' : ''
          }`}
          onClick={() => handleSingleRatingChange(selectedProject, category, rating)}
        >
          {rating}
        </div>
      ))}
    </div>
  );
};

const criteriaToSubcategories = useMemo(() => ({
  "D1 and D2": ['category1', 'category2', 'category3', 'category4'],
  "Involvement of associates": ['kpi-improvement-category1', 'kpi-improvement-category2', 'kpi-improvement-category3'],
  }), []); // array-ul gol indică faptul că useMemo nu are dependențe și, astfel, valoarea va fi memorată și nu se va schimba între randări

const [formIsValid, setFormIsValid] = useState(false);

// Pentru inițializarea ratingurilor
useEffect(() => {
  if (selectedProject && !projectRatings[selectedProject]) {
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    const initialRatings = {};
    for (const subcategory of relevantSubcategories) {
      initialRatings[subcategory] = 0;
    }
    setProjectRatings((prevRatings) => ({
      ...prevRatings,
      [selectedProject]: initialRatings,
    }));
  }
}, [selectedProject, selectedDepartment, projectRatings, criteriaToSubcategories]);

// Pentru validarea formularului
useEffect(() => {
  if (!selectedDepartment || !projects[selectedDepartment]) return; // Ieșiți din efect dacă departamentul selectat nu este valid
  
  const allProjectsForDepartment = projects[selectedDepartment];
  
  const allProjectsRated = allProjectsForDepartment.every(project => {
    const ratingsForProject = projectRatings[project] || {};
    const relevantSubcategories = departmentCriteria[selectedDepartment].flatMap(criteria => criteriaToSubcategories[criteria] || []);
    return relevantSubcategories.every(subcategory => ratingsForProject[subcategory] && ratingsForProject[subcategory] !== 0);
  });
  
  setFormIsValid(allProjectsRated);
}, [projectRatings, selectedDepartment, criteriaToSubcategories]);

  return (
    <div className="App">
      {/* Afișați fereastra de încărcare și progresul doar atunci când "loading" este true */}
    {loading && (
      
      <div className="loader-container">
        <div className="loader"></div>
        <div className="progress">{progress}%</div>
      </div>
    )}
      <h1>PS Awards Digital Booklet 2024</h1>
      <form className="dropdown" onSubmit={handleSubmit} >
      <div className='dropdown-container'>
      <div>
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="dropdown-button"
        >
          <option value="">Select department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div></div>
      <div className='dropdown-container'>
      {selectedDepartment && (
        <div className="dropdown">
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            className="dropdown-button"
          >
            <option value="">Select project</option>
            {projects[selectedDepartment].map((project) => (
              <option key={project} value={project}>
                {project}
              </option>     
            ))}
          </select>
        </div>
      )}</div>
      {selectedProject && (
        <div className="form">
          <div className="form-row">
            <label>{selectedProject ? `${selectedProject}` : 'Nume:'}</label>
            <label>{defineProjects[selectedProject]}</label>
          </div>
          <div className="form-row">
            <label>Team Leader:</label>
            <label>{defineProjectLeader[selectedProject]}</label>
            <div>
            <label>Notes:</label>
            <div>
    <textarea
      id="notes"
      className="note-size"
      value={notes[selectedDepartment]?.[selectedProject] || ''}
      onChange={handleNotesChange}
      placeholder="Add your notes here..."
    /><br />
  </div></div></div>
      <div>
          <label><i>*Please select a mark for each project from below</i></label>
          <br />
        
          </div>
          {selectedDepartment && departmentCriteria[selectedDepartment].includes("D1 and D2") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">
              D1 and D2
              </label>
            </div>
            <label className="text-left">
              1. Is the PS team complete? (rate 0 to 5; 0 - TL only, 5 - Sponsor, TL, PS expert and specialists in the team) 
              <ul style={{ listStyleType: 'lower-alpha' }}>
                <li>Is the Sponsor appointed?</li>
                <li>Was a TL nominated?</li>
                <li>Relevant departments and expertise available in the team?</li>
              </ul>
            </label>
            {renderRatings(selectedProject, 'category1', 5)}
            <label className="text-left">
              2. Is the aim/scope of the project defined and the non-conformity clearly described? (In Shainin: Project statement) (rate 0 to 5; 0 - very brief description, 5 - specific problem description complete with pictures, wrong/good example) 
                <ul style={{ listStyleType: 'lower-alpha' }}>
                  <li>What is exactly the non-conformity? Is it described specifically? (bad example: wrong label, good example: field 5 from customer label missing)</li>
                </ul>
            </label>
            {renderRatings(selectedProject, 'category2', 5) }
            <label className="text-left">
              3. Is the fundamental problem clearly described, as a result of the Is/Is not analysis?   
                <ul style={{ listStyleType: 'lower-alpha' }}>
                  <li>In facts collection, are there answers to the following questions: What, Where, When, Who, How much?</li>
                  <li>In Shainin: problem definition with info about what, where, when, who, how much?</li>
                  <li>Are there photos regarding defects available? (good/bad part representation)</li>
                  <li>Graphs (for when again, how much, wherever is applicable) available?</li>
                </ul>
            </label>
            {renderRatings(selectedProject, 'category3', 5)}
            <label className="text-left">
              4. Is D2 problem oriented (Shainin: Is Focus and Approch problem oriented)? 
            </label>
            {renderRatings(selectedProject, 'category4', 5)}
          </div>)}

          {selectedDepartment && departmentCriteria[selectedDepartment].includes("Involvement of associates") && (
          <div className="form-row score-section">
            <div>
              <label className="ps-awards-text">Involvement of associates</label>
            </div>
            <label className="text-left">
              1. Team and resource management: planning meetings, actions derived from meetings
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category1', 5)}
            <label className="text-left">
              2. Involvement and support of the sponsor in reviews 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category2', 5)}
            <label className="text-left">
              3. Involvement of relevant functions from the affected area 
            </label>
            {renderRatings(selectedProject, 'kpi-improvement-category3', 5)}
          </div>)}


          <button type="submit" className="submit-button" disabled={!formIsValid}>Submit</button>
        </div>
      )}</form>
    </div>
  );
}
export default App;
