export function choicePointScore(choice) {
    return choice.id.charCodeAt(choice.id.length - 1) - 'a'.charCodeAt(0) + 1;
}

export function scoreLabel(score) {
    return String.fromCharCode('A'.charCodeAt(0) + 4 - score);
}

export function selectedChoice(question) {
    return question.choices.find(c => c.isSelected)
}

export function getLinkLearnMore(id) {
    if (id === "ArCCjSAArQ") {
        //Product assortment 
        return 'https://www.enterpriseready.io/features/product-assortment/';
    }
    if (id === "9oyGcxfnQj") {
        //Team Management
        return 'https://www.enterpriseready.io/features/team-management';
    }
    if (id === "V1KOIDXRuQ") {
        //Role-based Access Control
        return 'https://www.enterpriseready.io/features/role-based-access-control';
    }
    if (id === "ZLoR6l06Hv") {
        //Audit Logging 
        return 'https://www.enterpriseready.io/features/audit-log/';
    }
    if (id === "Wacop5KeeJ") {
        //Deployment Options
        return 'https://www.enterpriseready.io/features/product-assortment/';
    }
    if (id === "xk2iGjzAFA") {
        //SSO
        return 'https://www.enterpriseready.io/features/single-sign-on/';
    }
    if (id === "Z2mzLcVaqR") {
        //Support/SLA
        return 'https://www.enterpriseready.io/features/support/';
    }
    if (id === "wxHCIAtokc") {
        //Integrations 
        return 'https://www.enterpriseready.io/features/integrations/';
    }
    if (id === "fS10auu4Zj") {
        //Change Management 
        return 'https://www.enterpriseready.io/features/change-management';
    }
    if (id === "ELKRlzga1l") {
        //Reporting
        return 'https://www.enterpriseready.io/features/advanced-reporting/';
    }
    if (id === "T2ocAbIjoL") {
        //Security
        return 'https://www.enterpriseready.io/features/product-security/';
    }
}

export function finalScore(questions) {
    let sum = 0;
    for (let i = 0; i < questions.length; i++) {
        const selectedChoice = questions[i].choices.find(c => c.isSelected)
        sum += choicePointScore(selectedChoice)
    }

    return Math.floor(sum / questions.length)
}