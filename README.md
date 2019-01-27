# Angular Inject Service

## Features

Easily inject services into your components/directives etc.

no need to create a constructor, or write the name of the variable.

![Use Extension](images/inject.gif)

## How it works ?

option 1: without a constructor

just write `:ServiceName`  (semicolon followed by the sevice name) and let vscode to complete the service name and insert the appropriate import.
now just press CTRL-Shift-I  , the automatically, this will change to

`constructor(private serviceName: ServiceName)`

option 2: constructor already exists

`constructor (private userService: UserService )`

just add `,:LoggerService`   after the existing service,  let vscode do the import of the service, press CTRL-Shift-I , and the text will change to

`constructor (private userService: UserService, private loggerService: LoggerService )`





## Release Notes



### 0.1.0

Initial release 

