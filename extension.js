// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require("path");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/** 支持的语言类型 */
const LANGUAGES = ['typescriptreact', 'typescript', 'javascript', 'javascriptreact'];
const CONFIG_PATH = ".formatool.json";
let locale = [];

const getFileData = (path)=>{
	return new Promise((resolve,reject)=>{
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				console.log(err)
				throw err;
			}
			const config = JSON.parse(data.toString());
			resolve(config)
		});
	})
}

const watchFileChange = (path)=>{
	fs.watch(path,(event,filename)=>{
		if(event === "change") getLangData()
	})
}

const getLangData = async ()=>{
	const configPath = path.resolve(vscode.workspace.rootPath,CONFIG_PATH)
	if(!fs.existsSync(configPath)){
		return
	}
	const configData = await getFileData(configPath);

	if(!configData.defaultPath){
		return
	}
	locale = [];

	const langPath = path.resolve(vscode.workspace.rootPath,configData.defaultPath);
	watchFileChange(langPath);
	const data = await getFileData(langPath)
	const defaultData = {
		sortText: 'sortText',
		preselect: 'preselect',
	}
	Object.entries(data).forEach(([k,v])=>{
		locale.push({label:k,detail:v,insertText:`{formatMessage({id:'${k}'})}`,documentation:v, describe: '213', kind:vscode.CompletionItemKind.Function, filterText: k, ...defaultData})
		locale.push({label:v,detail:v,insertText:`{formatMessage({id:'${k}'})}`,documentation:v, describe: '123', kind:vscode.CompletionItemKind.Function,filterText: v, ...defaultData})
	})
}
/**
 * @param {vscode.ExtensionContext} context
 */
exports.activate = function(context) {
	console.log('Congratulations, your extension "format-tool-vscode" is now active!');
	const triggers = [' '];
	
	getLangData();
	const completionProvider = vscode.languages.registerCompletionItemProvider(LANGUAGES, {
		async provideCompletionItems(document, position, token, context) {
			return locale;
		}
	}, ...triggers);

	context.subscriptions.push(completionProvider);
}

// This method is called when your extension is deactivated
exports.deactivate = function() {}
