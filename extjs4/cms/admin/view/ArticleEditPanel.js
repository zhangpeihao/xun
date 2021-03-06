/*
 * File: admin/view/ArticleEditPanel.js
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

Ext.define('CMS.view.ArticleEditPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.articleEditPanel',

    border: false,
    frame: true,
    autoScroll: true,
    bodyPadding: 5,
    closable: true,
    url: 'admin/article/update',
    waitMsgTarget: true,

    initComponent: function() {
        var me = this;

        me.initialConfig = Ext.apply({
            url: 'admin/article/update',
            waitMsgTarget: true
        }, me.initialConfig);

        Ext.applyIf(me, {
            loader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 65
            },
            items: [
                {
                    xtype: 'fieldset',
                    defaults: {
                        columnWidth: 1,
                        padding: 2
                    },
                    layout: {
                        type: 'column'
                    },
                    title: '文章信息',
                    items: [
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '编号',
                            name: 'id'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '所属栏目',
                            name: 'channelName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '文章标题',
                            name: 'title',
                            allowBlank: false,
                            maxLength: 100
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '文章模板',
                            name: 'tpl',
                            maxLength: 50
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '上一篇',
                            name: 'prev'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '下一篇',
                            name: 'next'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '权重',
                            name: 'weight'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '点击量',
                            name: 'visits'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '创建时间',
                            name: 'date'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '关键字',
                            name: 'keywords'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: '摘要',
                            name: 'excerpt',
                            maxLength: 250
                        },
                        {
                            xtype: 'label',
                            columnWidth: 0.5,
                            text: '内容'
                        },
                        {
                            xtype: 'htmleditor',
                            height: 150,
                            hideLabel: true,
                            name: 'content'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                var formPanel = this.up('form');
                                var form = formPanel.getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        params: {
                                            id: formPanel.articleId
                                        },
                                        method: 'POST',
                                        success: function (fm, action) {
                                            Ext.MessageBox.alert('提示', '操作成功!');
                                        },
                                        failure: function (fm, action) {
                                            Ext.MessageBox.alert('提示', getErrorMsg(action));
                                        }
                                    });
                                }
                            },
                            text: '保存'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, event) {
                                this.up('form').loadForm();
                            },
                            text: '重新加载'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onFormAfterRender,
                    scope: me
                }
            }
        });

        me.processArticleEditPanel(me);
        me.callParent(arguments);
    },

    processArticleEditPanel: function(config) {
        //config.store = Ext.create('CMS.data.Article');
        //config.store.container = this;
        return config;
    },

    onFormAfterRender: function(component, eOpts) {
        this.loadForm();
    },

    loadForm: function() {
        var me = this;
        this.getForm().load({
            url:'admin/article/read',
            params: {
                id: this.articleId
            },
            waitMsg : '加载中...',
            failure: function (fm, action) {
                Ext.MessageBox.alert('提示', getErrorMsg(action));
            }
        });
        return;
        Ext.Ajax.request({
            url:this.api.load,
            params: {
                id: this.articleId
            },
            loadMask: {msg: '加载中...'},
            success : function(response, options){
                console.debug(response, options);
                var result = Ext.JSON.decode(response.responseText);
                if(result.success){
                    me.getForm().reset();
                    me.getForm().setValues(result.data);
                    return;
                }
                Ext.MessageBox.alert('提示', result.msg);
            },
            failure: function (fm, action) {
                Ext.MessageBox.alert('提示', getErrorMsg(action));
            }
        });
    }

});