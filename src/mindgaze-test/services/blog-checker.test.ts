import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class BlogCheckService {
    private readonly logger = new Logger(BlogCheckService.name);
    private heartbeat = 0;
    private http: AxiosInstance;

    constructor() {
        this.http = axios.create({
            baseURL: 'https://blog.mindgaze.tech',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    @Interval(60000)
    public async invokeHeartbeat() {
        this.logger.log(`Invoking blog # ${this.heartbeat++}`);

        const resp = await this.http.get(`?reqNr=${this.heartbeat}`);
        if (resp.status != 200) {
            this.logger.warn(`Unexpected status ${resp.status}`);
        } else {
            this.logger.debug('OK');
        }
    }
}
