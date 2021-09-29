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
            baseURL: 'https://afivan.com',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // @Interval(60000)
    public async invokeHeartbeat() {
        this.logger.log(`Invoking interval # ${this.heartbeat++}`);

        const pages = [
            `?reqNr=${this.heartbeat}`,
            'category/development/aspnetcore-library/',
            '2020/05/19/ordering-in-asp-net-core-api/',
            '2020/03/13/pagination-in-asp-net-core/',
            '2020/01/06/filtering-in-asp-net-core/',
            '2019/12/19/mindgaze-aspnetcore-library-apis-with-ease/'
        ];

        pages.forEach(async (page) => {
            const resp = await this.http.get(page);
            if (resp.status != 200) {
                this.logger.warn(`Unexpected status ${resp.status} ${page}`);
            } else {
                this.logger.debug(`OK ${page}`);
            }
        })
    }
}
