# Config Service

The config service reads environment variables and exposes them as a nestjs service.

### Development
For the development environment all variables are stored in `.env.development` at the project root.   
If you're starting out fresh an example without secrets is delivered also. To start using it locally execute `$ cp .env.example .env.development` and fill in the missing parameters.

### Production
For production only a few parameters are provided with the `.env.production` file. The rest are injected by the production docker container.

## IoC Container
Because this module is globally available you do not need to add it to your module's `imports`. Simply inject it into your service and start using it.

## Validation
All env variables need to be validated. If you add a new one also add a new validation to `validate-config.ts` and add a new method to the service to expose it.

## Usage Example
```typescript
// modules/my-module/my-module.service.ts
import { ConfigService } from 'modules/config/config.service';

export class MyModuleServiec {
  constructor(
    private readonly config: ConfigService,
  ) {}

  myMethod() {
    return this.config.someValue;
  }
};
```