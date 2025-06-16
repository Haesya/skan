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

    return (
        <>
            {shownDocsCard.map((doc) => (
                <div className={style.one__publication}>
                    <div className={style.little__text}>
                        <span>{new Date (doc.ok.issueDate).toLocaleDateString()}</span>
                        <a target="_blank" href={doc.ok.url}>{doc.ok.source.name.replace(/\s*\([^)]*\)/, '')}</a>
                    </div>
                    <span className={style.article__name}>Название статьи</span>
                    <div className={style.article__category}>Технические новости</div>
                    <div className={style.article__picture}>Картинка статьи</div>
                    <span>Кусок статьи</span>
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