const parseHttp = require('../index.js')
describe('parser http', function(){
    it ('parses a request line', function(){
        // arrange
        const request = 'GET / HTTP/1.1'
        // act
        const output = parseHttp(request)
        // assert
        const expected = {
            verb: 'GET',
            path: '/',
            version: 'HTTP/1.1'
        }
        expect(output).toEqual(expected)
    })
    it ('normalizes the verb', function(){
        // arrange
        const request = 'get / HTTP/1.1'
        // act
        const output = parseHttp(request)
        // assert
        const expected = {
            verb: 'GET',
            path: '/',
            version: 'HTTP/1.1'
        }
        expect(output).toEqual(expected)
    })
    it ('sets content-type headers', function(){
        const request = 'GET / HTTP/1.1\ncontent-type: text/HTML; charset=utf8'
        const output = parseHttp(request)
        const expected ={
            verb: 'GET',
            path: '/',
            version: 'HTTP/1.1',
            headers: {
                'content-type': 'text/HTML; charset=utf8'
            }
        }
        expect(output).toEqual(expected)

    })
    it ('handles multiple headers', function(){
        const request = 'GET / HTTP/1.1\ncontent-type: text/HTML; charset=utf8\nAccept: text/HTML'
        const output = parseHttp(request)
        const expected ={
            verb: 'GET',
            path: '/',
            version: 'HTTP/1.1',
            headers: {
                'content-type': 'text/HTML; charset=utf8',
                'Accept': 'text/HTML'
            }
        }
        expect(output).toEqual(expected)

    })
})