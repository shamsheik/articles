// setupJest.ts
import 'jest-preset-angular';
import 'core-js/proposals/reflect-metadata';
import 'zone.js/dist/zone.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/zone-testing';


const { getTestBed } = require('@angular/core/testing');
const testingModule = require('@angular/platform-browser-dynamic/testing');

getTestBed().initTestEnvironment(
  testingModule.BrowserDynamicTestingModule,
  testingModule.platformBrowserDynamicTesting()
);
