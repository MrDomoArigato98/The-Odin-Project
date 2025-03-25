const store = (function (){

    const saveProject = (project) => {
        localStorage.setItem(project.name, JSON.stringify(project));

        // let newObject = localStorage.getItem(project.name);
        // console.log("after this")
        // console.log(JSON.parse(newObject));
    }

    const loadProjects = () => {
        const projectListJSON = [];
        for (let i = 0; i < localStorage.length; i++){
            projectListJSON.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            console.log("here")
            console.log(projectListJSON)
            
        }
        return(projectListJSON)
    }

    const deleteProject = (project) => {
        localStorage.removeItem(project.name)
    }
    return { saveProject, loadProjects, deleteProject }
})();

export { store}