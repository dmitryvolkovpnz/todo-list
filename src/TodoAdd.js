import { Component } from "react";
import { Navigate } from "react-router-dom";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
        this.state = { redirect: false };
    }

    clearFormData() {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        };
    }

    handleTitleChange (evt) {
        this.formData.title = evt.target.value;
    }

    handleDescChange (evt) {
        this.formData.desc = evt.target.value;
    }

    handleImageChange (evt) {
        const cFiles = evt.target.files;
        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }
            fileReader.readAsDataURL(cFiles[0]);
        } else
            this.formData.image = '';
    }


    handleFormSubmit (evt) {
        evt.preventDefault();
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
        this.setState((state) => ({ redirect: true }));
    }

    render() {
        if (this.state.redirect)
            return <Navigate to="/" />;
        else
        return(
            <section>
                <h1>создание нового дела</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="field">
                        <label className="label">заголовок</label>
                        <div className="control">
                            <input className="input"
                                   onChange={this.handleTitleChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <input className="textarea"
                                   onChange={this.handleDescChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="file">
                            <input className="file-input"
                                   type="file" accept="image/*"
                                   onChange={this.handleImageChange}
                            />
                            <span className="file-cta">
                                <span className="file-label">
                                    графическая илюсстрация
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light"
                                   value="Сброс"
                            />
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary"
                                   value="Создать"
                            />
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}