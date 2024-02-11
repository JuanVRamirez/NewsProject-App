export function formatDate(dateString: string | undefined): string {
    if (!dateString) {
        return 'Fecha no disponible'; 
    }

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}