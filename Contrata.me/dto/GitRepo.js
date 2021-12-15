class GitRepo {

    constructor(name, url, language, description) {
        this.name = name;
        this.url = url;
        this.language = language;
        this.description = description;
    }

    getName() {
        return this.name
    }

    getUrl() {
        return this.url
    }

    getLanguage() {
        return this.language
    }

    getDescription() {
        return this.description
    }

}

module.exports = {
    GitRepo
}