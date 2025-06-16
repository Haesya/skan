import style from './onePublication.module.css'

interface Doc {
    id: string;
    ok: {
        issueDate: string;
        url: string;
        source: {
            name: string;
        };
        title: {
            text: string;
        };
        content: {
            markup: string;
        };
        attributes: {
            isTechNews?: boolean;
            isAnnouncement?: boolean;
            isDigest?: boolean;
            wordCount: number;
        };
    };
    isTechNews?: boolean;
}

interface DocsProps {
    documents: Doc[];
    shownDocs: number;
}

const RenderOnePublication = ({documents, shownDocs}: DocsProps) => {
    const shownDocsCard = documents.slice(0, shownDocs)

    const checkCategory = (doc) => {
        let category = ""
        if (doc.ok.attributes.isTechNews)
            category = "Технические новости"
        else if (doc.ok.attributes.isDigest)
            category = "Сводки новостей"
        else if (doc.ok.attributes.isAnnouncement)
            category = "Анонсы и события"
        else
            category = "Без категории"
        return category
    }

    const parseArticle = (doc) => {
        const xml = doc.ok.content.markup
        const div = document.createElement("div")
        div.innerHTML = xml
        let cleanArticle = div.textContent || div.innerText || "";
        cleanArticle = cleanArticle.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "")

        if(cleanArticle.length > 300) {
            cleanArticle = cleanArticle.slice(0, 300)
        }

        return cleanArticle
    }

    return (
        <>
            {shownDocsCard.map((doc) => (
                <div className={style.one__publication}>
                    <div className={style.little__text}>
                        <span>{new Date (doc.ok.issueDate).toLocaleDateString()}</span>
                        <a target="_blank" href={doc.ok.url}>{doc.ok.source.name.replace(/\s*\([^)]*\)/, '')}</a>
                    </div>
                    <span className={style.article__name}>{doc.ok.title.text}</span>
                    <div className={style.article__category}>{checkCategory(doc)}</div>
                    <div className={style.article__picture}>Чет какие-то проблемы с картинкой</div>
                    <span>{parseArticle(doc)}</span>
                    <div className={style.footer__publication}>
                        <button>Читать в источнике</button>
                        <span>Сколько слов в статье</span>
                    </div>
                </div>
                ))
            }
        </>
    )
}

export {RenderOnePublication}