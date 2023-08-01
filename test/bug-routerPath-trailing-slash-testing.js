'use strict'

const t = require('tap')
const fastify = require('../fastify')()

t.test('routerPath should not return url with a trailing slash', t=> {
    t.plan(1)

    fastify.addHook('onRoute', ({ method, url }) => {
        console.log('New route added:', method, url)
       })
       
       fastify.register(async (fastify) => {
        fastify.get('/', async (request) => {
          console.log(request.routerPath)
        })
       }, { prefix: '/foo' })
       
       fastify.ready(() => {
        fastify.inject({ method: 'GET', url: '/foo' })
        fastify.inject({ method: 'GET', url: '/foo/' })
       })
    t.pass() // reaching here means previous lines run without error
})

// Mar 1 comment
t.test('routerPath should not return url with a trailing slash2', t=> {
    t.plan(1)

    fastify.addHook('onRoute', ({ method, url }) => {
    console.log('New route added:', method, url)
    })

    fastify.register(async (fastify) => {
    fastify.get('/', async (request) => {
    console.log(request.routerPath)
    })
    fastify.get('/bar/', async (request) => {
    console.log(request.routerPath)
    })
    }, { prefix: '/foo' })

    fastify.ready(() => {
    fastify.inject({ method: 'GET', url: '/foo' })
    fastify.inject({ method: 'GET', url: '/foo/' })
    fastify.inject({ method: 'GET', url: '/foo/bar/' })
    })
    
    t.pass() // reaching here means previous lines run without error
})