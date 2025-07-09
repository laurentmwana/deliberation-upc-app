export const ago = (
    dateParse: string | Date | number,
    options: {
        short?: boolean;
        withSuffix?: boolean;
        fullText?: boolean;
    } = {},
) => {
    const { short = true, withSuffix = true, fullText = false } = options;
    const date = new Date(dateParse);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Calculate all time units
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // Default suffix
    const suffix = withSuffix ? (fullText ? ' ago' : '') : '';

    // Full text labels
    const fullLabels = {
        seconds: 'secondes',
        minutes: 'minutes',
        hours: 'heures',
        days: 'jours',
        weeks: 'semaines',
        months: 'mois',
        years: 'ans',
    };

    // Short labels
    const shortLabels = {
        seconds: 's',
        minutes: 'min',
        hours: 'h',
        days: 'j',
        weeks: 'sem',
        months: 'mois',
        years: 'an',
    };

    const labels = fullText ? fullLabels : shortLabels;

    if (diffInSeconds < 60) {
        const value = fullText ? Math.floor(diffInSeconds) : diffInSeconds;
        return `${value} ${short ? labels.seconds : ''}${suffix}`;
    }

    if (minutes < 60) {
        return `${minutes} ${short ? labels.minutes : ''}${suffix}`;
    }

    if (hours < 24) {
        return `${hours} ${short ? labels.hours : ''}${suffix}`;
    }

    if (days < 7) {
        return `${days} ${short ? labels.days : ''}${suffix}`;
    }

    if (weeks < 4) {
        return `${weeks} ${short ? labels.weeks : ''}${suffix}`;
    }

    if (months < 12) {
        return `${months} ${short ? labels.months : ''}${suffix}`;
    }

    return `${years} ${short ? labels.years : ''}${suffix}`;
};

export const getFrenchDay = (dateStr: string): string => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    if (!isValidDate) {
        throw new Error("Le format de la date doit être 'Y-m-d'.");
    }

    const date = new Date(dateStr);

    const daysInFrench = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

    const dayIndex = date.getDay();

    return daysInFrench[dayIndex];
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
