/*
 * File: admin/model/Article.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CMS.model.Article', {
    extend: 'Ext.data.Model',
    alias: 'model.article',

    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            dateFormat: 'Y-m-d H:i:s',
            name: 'date',
            type: 'date'
        },
        {
            dateFormat: 'Y-m-d H:i:s',
            name: 'modified',
            type: 'date'
        },
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'excerpt',
            type: 'string'
        },
        {
            name: 'author',
            type: 'string'
        },
        {
            name: 'origin',
            type: 'string'
        },
        {
            name: 'tpl',
            type: 'string'
        },
        {
            name: 'visits',
            type: 'int'
        },
        {
            name: 'weight',
            type: 'int'
        },
        {
            name: 'keywords',
            type: 'string'
        },
        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'publisherName',
            type: 'string'
        },
        {
            name: 'modifierName',
            type: 'string'
        },
        {
            dateFormat: '0',
            name: 'channelId',
            type: 'int'
        },
        {
            name: 'channelName',
            type: 'string'
        },
        {
            mapping: 'date',
            name: 'dateString',
            type: 'string'
        }
    ]
});