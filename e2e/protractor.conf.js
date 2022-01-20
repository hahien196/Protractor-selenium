// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { Authenticator } = require('authenticator-browser-extension');
var HtmlReporter = require('protractor-beautiful-reporter');
var path = require('path');
var downloadsPath = path.resolve('./tmp/downloads');
exports.config = {
  rootElement: '*[app-root]',
  allScriptsTimeout: 60000,
  specs: [
    
    './src/specs/*.e2e-spec.ts',
  ],
  capabilities: {

    'browserName': 'chrome',
    'args': ['disable-web-security'],
    'unicodeKeyboard': true,
    chromeOptions: {
      extensions: [
        Authenticator.for('candidatex', 'qa-is-cool').asBase64()
      ],
      prefs: {
        download: {
          'prompt_for_download': false,
          'default_directory': downloadsPath
        }
      }
    }

  
    
  },
  params: {
    browser: {
      name: 'chrome',
      args: ['--headless']
    }
  },
  
  directConnect: true,
  baseUrl: 'https://qa-task.backbasecloud.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    showTiming: true,
    defaultTimeoutInterval: 60000,
    print: () => { }
  },

  suites: {
    articles_create: './src/specs/create_articles.e2e-spec.ts',
  },
  onPrepare() {
    browser.waitForAngularEnabled(false);

    browser.driver.manage().window().maximize();
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    // jasmine.getEnv().addReporter(new HtmlReporter({
    //   baseDirectory: 'reports',  
    //   cleanDestination: true,    
    //   docName: 'index.html'
    // }).getJasmine2Reporter());

    jasmine.getEnv().addReporter(new HtmlReporter({
      preserveDirectory: false,
      takeScreenShotsOnlyForFailedSpecs: false,
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      baseDirectory: 'reports-tmp',

      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
          var currentDate = new Date(),
              day = currentDate.getDate(),
              month = currentDate.getMonth() + 1,
              year = currentDate.getFullYear();

          var validDescriptions = descriptions.map(function (description) {
              return description.replace('/', '@');
          });

          return path.join(
              day + "-" + month + "-" + year,
              validDescriptions.join('-'));
      }
  }).getJasmine2Reporter());
  }
};