"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_logger_1 = require("../loggers/common.logger");
let LoggerInterceptor = class LoggerInterceptor {
    intercept(context, next) {
        const loggerResponse = new common_logger_1.CommonLogger('RESPONSE');
        const { method, originalUrl } = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const now = Date.now();
        return next
            .handle()
            .pipe((0, rxjs_1.tap)((data) => loggerResponse.customInfo(method !== 'GET'
            ? `${method} ${originalUrl} ${statusCode} - IN: ${Date.now() - now}ms - BODY: ${JSON.stringify(data)}`
            : `${method} ${originalUrl} ${statusCode} - IN: ${Date.now() - now}ms`)));
    }
};
LoggerInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggerInterceptor);
exports.LoggerInterceptor = LoggerInterceptor;
//# sourceMappingURL=logger.interceptor.js.map