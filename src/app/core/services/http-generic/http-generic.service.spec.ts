import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpGenericService } from './http-generic.service';

describe('HttpGenericService', () => {
    let service: HttpGenericService;
    let mock: HttpTestingController;

    const sUrl = 'http://test/example';
    const dataResponse = { id: 1, name: 'test' };
    const errorEvent: ErrorEvent = new ErrorEvent('404 error');
    const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not found'
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(HttpGenericService);
        mock = TestBed.inject(HttpTestingController);
    });

    beforeEach(() => {
        jest.resetAllMocks();
        mock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // get

    it('get: should return the provided arrangement', () => {
        let resp = {};
        service.get(sUrl).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(sUrl);
        req.flush(dataResponse);

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('get: should make a request with parameters and headers', () => {
        let resp = {};
        let params = new HttpParams();
        params = params.append('id', '1');
        params = params.append('name', 'param');
        const headers = new HttpHeaders().set('codcia', '2');
        service.get(sUrl, params, headers).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(`${sUrl}?id=1&name=param`);
        req.flush(dataResponse);

        expect(req.request.method).toBe('GET');
        expect(req.request.params).toBe(params);
        expect(req.request.headers).toBe(headers);
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('get: should make a request with parameters', () => {
        let resp = {};
        let params = new HttpParams();
        params = params.append('id', '1');
        params = params.append('name', 'param');
        service.get(sUrl, params).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(`${sUrl}?id=1&name=param`);
        req.flush(dataResponse);

        expect(req.request.method).toBe('GET');
        expect(req.request.params).toBe(params);
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('get: should return an errorResponse', () => {
        const spy = jest.spyOn(service, 'handleError');
        service.get(sUrl).subscribe(console.log);
        const req = mock.expectOne(sUrl);
        req.error(errorEvent, errorResponse);

        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(sUrl);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    // put

    it('put: should return the provided arrangement', () => {
        let resp = {};
        service.put(sUrl, dataResponse).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(sUrl);
        req.flush(dataResponse);

        expect(req.request.method).toBe('PUT');
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('put: should return an errorResponse', () => {
        const spy = jest.spyOn(service, 'handleError');
        service.put(sUrl, dataResponse).subscribe(console.log);
        const req = mock.expectOne(sUrl);
        req.error(errorEvent, errorResponse);

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toBe(dataResponse);
        expect(req.request.url).toBe(sUrl);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    // post

    it('post: should return the provided arrangement', () => {
        let resp = {};
        service.post(sUrl, dataResponse).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(sUrl);
        req.flush(dataResponse);

        expect(req.request.method).toBe('POST');
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('post: should return an errorResponse', () => {
        const spy = jest.spyOn(service, 'handleError');
        service.post(sUrl, dataResponse).subscribe(console.log);
        const req = mock.expectOne(sUrl);
        req.error(errorEvent, errorResponse);

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(dataResponse);
        expect(req.request.url).toBe(sUrl);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    // delete

    it('delete: should return the provided arrangement', () => {
        let resp = {};
        service.delete(sUrl).subscribe((response: any) => (resp = response));
        const req = mock.expectOne(sUrl);
        req.flush(dataResponse);

        expect(req.request.method).toBe('DELETE');
        expect(req.request.url).toBe(sUrl);
        expect(resp).toBe(dataResponse);
    });

    it('delete: should return an errorResponse', () => {
        const spy = jest.spyOn(service, 'handleError');
        service.delete(sUrl).subscribe(console.log);
        const req = mock.expectOne(sUrl);
        req.error(errorEvent, errorResponse);

        expect(req.request.method).toBe('DELETE');
        expect(req.request.url).toBe(sUrl);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    // handleError

    it('handleError: should validate that an error message exists and return it as part of the object', (done) => {
        const errorResponse = new HttpErrorResponse({
            status: 404,
            error: 'Not found',
        });
        service.handleError('test', errorResponse).subscribe(resp => {
            expect(resp.messageError).toEqual(errorResponse.error);
            done();
        });
    });

    it('handleError: should validate that no error message exists and return empty as part of the object', (done) => {
        const errorResponse = new HttpErrorResponse({
            status: 404
        });
        service.handleError('test', errorResponse).subscribe(resp => {
            expect(resp.messageError).toEqual('');
            done();
        });
    });
});
